import { differenceInDays, parseISO } from "date-fns";
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
} from "lodash";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { logbookService } from "@/services";
import type {
  Ascent,
  AscentRequest,
  Crag,
  Grade,
  Route,
  Sector,
  Style,
  TopGrade,
} from "@/types/logbook";

export const useLogbookStore = defineStore("logbook", () => {
  const { _status, status } = useStoreStatus();

  const grades = ref<{ [key: number]: Grade }>({});
  const styles = ref<{ [key: number]: Style }>({});
  const crags = ref<{ [key: number]: Crag }>({});
  const sectors = ref<{ [key: number]: Sector }>({});
  const routes = ref<{ [key: number]: Route }>({});
  const ascents = ref<{ [key: number]: Ascent }>({});

  const hasAscents = computed(
    () => status.value.fetched && ascent_count.value > 0
  );

  const ascent_count = computed(() => size(ascents.value));

  const ascents_by_day = computed(() => groupBy(ascents.value, "date"));

  const crag_visit_count = computed(
    () => uniq(map(ascents.value, "date")).length
  );

  const ascent_last_year = computed(() =>
    filter(
      ascents.value,
      (ascent: Ascent) =>
        differenceInDays(new Date(parseISO(ascent.date)), new Date()) >= -365
    )
  );

  const ascent_last_year_count = computed(() => ascent_last_year.value.length);

  const crag_visit_last_year_count = computed(
    () => uniqBy(ascent_last_year.value, "date").length
  );

  const ascents_os = computed(() =>
    filter(ascents.value, (ascent) => ascent.style === 1)
  );

  const ascents_fl = computed(() =>
    filter(ascents.value, (ascent) => ascent.style === 2)
  );

  const ascents_rp = computed(() =>
    filter(ascents.value, (ascent) => ascent.style === 3)
  );

  const top_grades = computed(() => {
    const get_max_grade_for_style = (style: Style) =>
      grades.value[
        max(
          filter(ascents.value, ["style", style.id]).map(
            (ascent: Ascent) => routes.value[ascent.route].grade
          )
        ) as number
      ];

    return orderBy(
      reduce(
        styles.value,
        (acc: TopGrade[], style: Style) => {
          acc.push({
            grade: get_max_grade_for_style(style),
            style: style,
          });

          return acc;
        },
        []
      ),
      "grade.weight",
      "desc"
    );
  });

  async function submitAscent(ascent: AscentRequest) {
    try {
      const response = await logbookService.addAscent(ascent);

      ascents.value[response.id] = response;

      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
    }
  }

  function addAscentDummy() {
    submitAscent({
      second_go: false,
      personal_grade_flag: null,
      date: "2022-12-05",
      first_ascent: false,
      recommended: true,
      quality: 3,
      comment: "Very nice climb with some long reach boulder problems.",
      route: 6860,
      style: 1,
      personal_grade: null,
    });
  }

  async function deleteAscent(id: number) {
    try {
      const response = await logbookService.deleteAscent(id);

      if (response.status === 204) {
        delete ascents.value[id];
      }

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  function fetch() {
    _status.value = "FETCHING";

    return Promise.all([
      _fetchGrades(),
      _fetchStyles(),
      _fetchCrags(),
      _fetchSectors(),
      _fetchRoutes(),
      _fetchAscents(),
    ]).then(
      () => (_status.value = "FETCHED"),
      () => {
        _status.value = "FAILED";
        console.log("Problem fetching training data. Log in again.");
      }
    );
  }

  const _fetchGrades = async () =>
    (grades.value = keyBy(await logbookService.fetchGrades(), "id"));

  const _fetchStyles = async () =>
    (styles.value = keyBy(await logbookService.fetchStyles(), "id"));

  const _fetchCrags = async () =>
    (crags.value = keyBy(await logbookService.fetchCrags(), "id"));

  const _fetchSectors = async () =>
    (sectors.value = keyBy(await logbookService.fetchSectors(), "id"));

  const _fetchRoutes = async () =>
    (routes.value = keyBy(await logbookService.fetchRoutes(), "id"));

  const _fetchAscents = async () =>
    (ascents.value = keyBy(await logbookService.fetchAscents(), "id"));

  return {
    // state
    _status,
    grades,
    styles,
    crags,
    sectors,
    routes,
    ascents,

    // getters
    status,
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
    fetch,
    deleteAscent,
    addAscentDummy,
  };
});
