import { countBy, keyBy, map, size, uniq } from "lodash-es";
import { defineStore } from "pinia";
import { computed, type ComputedRef, ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { trainingService } from "@/services";
import type { TrainingSession, TrainingSessionRequest } from "@/types/training";

import { useCoreCityStore } from "../core/city";
import { useCoreCountryStore } from "../core/country";
import { useTrainingGymStore } from "./gym";

export const useTrainingSessionStore = defineStore("training/session", () => {
  const { _status, status } = useStoreStatus();
  const gymStore = useTrainingGymStore();
  const cityStore = useCoreCityStore();
  const countryStore = useCoreCountryStore();

  const sessions = ref<{ [key: number]: TrainingSession }>({});

  const hasSessions = computed(
    () => status.value.fetched && session_count.value > 0,
  );

  const session_count = computed(() => size(sessions.value));

  const uniq_gyms = computed(() =>
    uniq(map(sessions.value, (session) => gymStore.gyms[session.gym])),
  );

  const uniq_cities = computed(() => {
    return uniq(
      map(sessions.value, (session) => {
        const gym = gymStore.gyms[session.gym];
        return cityStore.cities[gym.city];
      }),
    );
  });

  const uniq_countries = computed(() => {
    return uniq(
      map(sessions.value, (session) => {
        const gym = gymStore.gyms[session.gym];
        const city = cityStore.cities[gym.city];
        return countryStore.countries[city.country];
      }),
    );
  });

  const uniq_gyms_count = computed(() => uniq_gyms.value.length);
  const uniq_cities_count = computed(() => uniq_cities.value.length);
  const uniq_countries_count = computed(() => uniq_countries.value.length);

  // key (gym.id): value (occurrence count)
  const top_gyms: ComputedRef<{ [key: string]: number }> = computed(() =>
    countBy(sessions.value, "gym"),
  );

  async function create(session: TrainingSessionRequest) {
    try {
      const response = await trainingService.session.create(session);
      sessions.value[response.id] = response;
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async function fetch() {
    async function fetch() {
      return (sessions.value = keyBy(
        await trainingService.session.fetch(),
        "id",
      ));
    }

    _status.value = "FETCHING";

    return Promise.all([gymStore.fetch(), fetch()]).then(
      () => (_status.value = "FETCHED"),
      (error) => {
        _status.value = "FAILED";
        console.log(
          "Something went wrong fetching training/session data.",
          error,
        );
      },
    );
  }

  async function remove(id: number) {
    try {
      const response = await trainingService.session.delete(id);
      if (response.status === 204) delete sessions.value[id];
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function update(id: number, session: TrainingSessionRequest) {
    try {
      const response = await trainingService.session.update(id, session);
      if (response.status === 200) sessions.value[id] = response.data;
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    // state
    sessions,

    // getters
    _status,
    status,
    hasSessions,
    top_gyms,

    uniq_gyms,
    uniq_cities,
    uniq_countries,

    session_count,
    uniq_gyms_count,
    uniq_cities_count,
    uniq_countries_count,

    // actions
    create,
    fetch,
    remove,
    update,
  };
});
