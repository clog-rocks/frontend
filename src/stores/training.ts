import { countBy, keyBy, map, size, uniq } from "lodash-es";
import { defineStore } from "pinia";
import { computed, type ComputedRef, ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { trainingService } from "@/services";
import { useCoreStore } from "@/stores";
import type {
  Gym,
  TrainingSession,
  TrainingSessionRequest,
} from "@/types/training";

export const useTrainingStore = defineStore("training", () => {
  const { _status, status } = useStoreStatus();

  const gyms = ref<{ [key: number]: Gym }>({});
  const sessions = ref<{ [key: number]: TrainingSession }>({});

  const hasSessions = computed(
    () => status.value.fetched && session_count.value > 0
  );

  const session_count = computed(() => size(sessions.value));

  const user_gyms = computed(() =>
    uniq(map(sessions.value, (session) => gyms.value[session.gym]))
  );

  const user_cities = computed(() => {
    const coreStore = useCoreStore();

    return uniq(
      map(sessions.value, (session) => {
        const gym = gyms.value[session.gym];
        return coreStore.cities[gym.city];
      })
    );
  });

  const user_countries = computed(() => {
    const coreStore = useCoreStore();

    return uniq(
      map(sessions.value, (session) => {
        const gym = gyms.value[session.gym];
        const city = coreStore.cities[gym.city];
        return coreStore.countries[city.country];
      })
    );
  });

  const gym_count = computed(() => user_gyms.value.length);
  const city_count = computed(() => user_cities.value.length);
  const country_count = computed(() => user_countries.value.length);

  // key (gym.id): value (occurrence count)
  const top_gyms: ComputedRef<{ [key: string]: number }> = computed(() =>
    countBy(sessions.value, "gym")
  );

  async function fetch() {
    _status.value = "FETCHING";
    return Promise.all([_fetchGyms(), _fetchSessions()]).then(
      () => (_status.value = "FETCHED"),
      () => {
        _status.value = "FAILED";
        console.log("Problem fetching training data. Log in again.");
      }
    );
  }

  const _fetchGyms = async () =>
    (gyms.value = keyBy(await trainingService.fetchGyms(), "id"));

  const _fetchSessions = async () =>
    (sessions.value = keyBy(await trainingService.fetchSessions(), "id"));

  async function submitSession(session: TrainingSessionRequest) {
    try {
      const response = await trainingService.addSession(session);

      sessions.value[response.id] = response;

      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
    }
  }

  function addSessionDummy() {
    submitSession({
      gym: 22,
      date: new Date().toISOString().split("T")[0],
      comment: "On pinia!",
      tags: ["bouldering", "pinia"],
    });
  }

  async function deleteSession(id: number) {
    try {
      const response = await trainingService.deleteSession(id);

      if (response.status === 204) {
        delete sessions.value[id];
      }

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    // State
    sessions,
    gyms,

    // actions
    fetch,
    submitSession,
    deleteSession,
    addSessionDummy,

    // getters
    _status,
    status,
    hasSessions,
    top_gyms,

    user_gyms,
    user_cities,
    user_countries,

    session_count,
    gym_count,
    city_count,
    country_count,
  };
});
