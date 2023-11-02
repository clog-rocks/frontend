import keyBy from "lodash-es/keyBy";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { trainingService } from "@/services";
import type {
  Gym,
  GymMultiselect,
  GymRequest,
  GymTree,
} from "@/types/training";

import { useCoreCityStore } from "../core/city";
import { useCoreCountryStore } from "../core/country";

export const useTrainingGymStore = defineStore("training/gym", () => {
  const { _status, status } = useStoreStatus();
  const cityStore = useCoreCityStore();
  const countryStore = useCoreCountryStore();

  const gyms = ref<{ [key: number]: Gym }>({});

  const tree = computed<{ [key: number]: GymTree }>(() =>
    keyBy(
      Object.values(gyms.value).map(
        (gym): GymTree => ({
          ...gym,
          city: cityStore.tree[gym.city],
        }),
      ),
      "id",
    ),
  );

  const multiselect = computed<GymMultiselect[]>(() =>
    Object.values(gyms.value).map((gym) => {
      const city = cityStore.cities[gym.city];
      return {
        id: gym.id,
        gym: gym.name,
        city: city.name,
        country: countryStore.countries[city.country].name,
      };
    }),
  );

  async function create(gym: GymRequest) {
    try {
      const response = await trainingService.gym.create(gym);
      gyms.value[response.id] = response;
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async function fetch() {
    try {
      gyms.value = keyBy(await trainingService.gym.fetch(), "id");
      _status.value = "FETCHED";
    } catch (error) {
      _status.value = "FAILED";
      console.log("Something went wrong fetching training/gym data.", error);
    }
  }

  return {
    // State
    _status,
    gyms,

    // getters
    multiselect,
    status,
    tree,

    // actions
    create,
    fetch,
  };
});
