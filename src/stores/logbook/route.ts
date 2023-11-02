import keyBy from "lodash-es/keyBy";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { logbookService } from "@/services";
import type {
  Route,
  RouteMultiselect,
  RouteRequest,
  RouteTree,
} from "@/types/logbook";

import { useLogbookCragStore } from "./crag";
import { useLogbookGradeStore } from "./grade";
import { useLogbookSectorStore } from "./sector";

export const useLogbookRouteStore = defineStore("logbook/route", () => {
  const { _status, status } = useStoreStatus();
  const gradeStore = useLogbookGradeStore();
  const cragStore = useLogbookCragStore();
  const sectorStore = useLogbookSectorStore();

  const routes = ref<{ [key: number]: Route }>({});

  const tree = computed<{ [key: number]: RouteTree }>(() =>
    keyBy(
      Object.values(routes.value).map(
        (route): RouteTree => ({
          ...route,
          sector: sectorStore.tree[route.sector],
          grade: gradeStore.grades[route.grade],
        }),
      ),
      "id",
    ),
  );

  const multiselect = computed<RouteMultiselect[]>(() =>
    Object.values(routes.value).map((route) => {
      const sector = sectorStore.sectors[route.sector];
      return {
        id: route.id,
        name: route.name,
        sector: sector.name,
        crag: cragStore.crags[sector.crag].name,
        grade: gradeStore.grades[route.grade].fr_route,
      };
    }),
  );

  async function create(route: RouteRequest) {
    try {
      const response = await logbookService.route.create(route);
      routes.value[response.id] = response;
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async function fetch() {
    try {
      routes.value = keyBy(await logbookService.route.fetch(), "id");
      _status.value = "FETCHED";
    } catch (error) {
      _status.value = "FAILED";
      console.log("Something went wrong fetching logbook/route data.", error);
    }
  }

  return {
    // state
    _status,
    routes,

    // getters
    multiselect,
    status,
    tree,

    // actions
    create,
    fetch,
  };
});
