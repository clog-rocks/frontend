import { differenceInDays } from "date-fns";
import {
  filter,
  groupBy,
  keyBy,
  map,
  max,
  orderBy,
  reduce,
  size,
  uniq,
  uniqBy,
} from "lodash-es";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { logbookService } from "@/services";
import type { Style, TopGrade } from "@/types/logbook";
import type {
  Ascent,
  AscentTree,
  CreateAscentRequest,
  PatchAscentRequest,
} from "@/types/logbook/ascent";

import { useLogbookCragStore } from "./crag";
import { useLogbookGradeStore } from "./grade";
import { useLogbookRouteStore } from "./route";
import { useLogbookSectorStore } from "./sector";
import { useLogbookStyleStore } from "./style";

export const useLogbookAscentStore = defineStore("logbook/ascent", () => {
  const { _status, status } = useStoreStatus();
  const styleStore = useLogbookStyleStore();
  const gradeStore = useLogbookGradeStore();
  const cragStore = useLogbookCragStore();
  const sectorStore = useLogbookSectorStore();
  const routeStore = useLogbookRouteStore();

  const ascents = ref<{ [key: number]: Ascent }>({});

  const tree = computed<{ [key: number]: AscentTree }>(() =>
    keyBy(
      Object.values(ascents.value).map((ascent) => ({
        ...ascent,
        route: routeStore.tree[ascent.route],
        style: styleStore.styles[ascent.style],
        personal_grade: ascent.personal_grade
          ? gradeStore.grades[ascent.personal_grade]
          : null,
      })),
      "id",
    ),
  );

  const hasAscents = computed(
    () => status.value.fetched && ascent_count.value > 0,
  );

  const ascent_count = computed(() => size(ascents.value));

  const ascents_by_day = computed(() => groupBy(ascents.value, "date"));

  const crag_visit_count = computed(
    () => uniq(map(ascents.value, "date")).length,
  );

  const ascent_last_year = computed(() =>
    filter(
      ascents.value,
      (ascent: Ascent) => differenceInDays(ascent.date, new Date()) >= -365,
    ),
  );

  const ascent_last_year_count = computed(() => ascent_last_year.value.length);

  const crag_visit_last_year_count = computed(
    () => uniqBy(ascent_last_year.value, "date").length,
  );

  const ascents_os = computed(() =>
    filter(ascents.value, (ascent) => ascent.style === 1),
  );

  const ascents_fl = computed(() =>
    filter(ascents.value, (ascent) => ascent.style === 2),
  );

  const ascents_rp = computed(() =>
    filter(ascents.value, (ascent) => ascent.style === 3),
  );

  const top_grades = computed(() => {
    const get_max_grade_for_style = (style: Style) =>
      gradeStore.grades[
        max(
          filter(ascents.value, ["style", style.id]).map(
            (ascent: Ascent) => routeStore.routes[ascent.route].grade,
          ),
        ) as number
      ];

    return orderBy(
      reduce(
        styleStore.styles,
        (acc: TopGrade[], style: Style) => {
          acc.push({
            grade: get_max_grade_for_style(style),
            style: style,
          });

          return acc;
        },
        [],
      ),
      "grade.weight",
      "desc",
    );
  });

  async function create(ascent: CreateAscentRequest) {
    try {
      const response = await logbookService.ascent.create(ascent);
      ascents.value[response.id] = response;
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async function update(id: number, ascent: PatchAscentRequest) {
    try {
      const response = await logbookService.ascent.update(id, ascent);
      ascents.value[response.id] = response;
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async function remove(id: number) {
    try {
      const response = await logbookService.ascent.delete(id);
      if (response.status === 204) delete ascents.value[id];
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  function fetch() {
    async function fetch() {
      return (ascents.value = keyBy(await logbookService.ascent.fetch(), "id"));
    }

    _status.value = "FETCHING";

    return Promise.all([
      gradeStore.fetch(),
      styleStore.fetch(),
      cragStore.fetch(),
      sectorStore.fetch(),
      routeStore.fetch(),
      fetch(),
    ]).then(
      () => (_status.value = "FETCHED"),
      (error) => {
        _status.value = "FAILED";
        console.log(
          "Something went wrong fetching logbook/ascent data.",
          error,
        );
      },
    );
  }

  return {
    // state
    _status,
    ascents,

    // getters
    status,
    tree,
    hasAscents,
    ascents_by_day,
    ascent_count,
    ascents_os,
    ascents_fl,
    ascents_rp,
    // ascent_last_year, // TODO: should it be exposed?
    ascent_last_year_count,
    crag_visit_count,
    crag_visit_last_year_count,
    top_grades,

    // actions
    create,
    fetch,
    remove,
    update,
  };
});
