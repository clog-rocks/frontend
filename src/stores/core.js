import { coreService } from "@/_services";
import { defineStore } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCoreStore = defineStore("core", {
  state: () => {
    return {
      loading: false,
      countries: {},
      cities: {},
    };
  },

  getters: {},

  actions: {
    async getCountries() {
      try {
        const response = await coreService.getCountries();

        this.countries = response.data.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {},
        );
      } catch (error) {
        // TODO: For dev phase only. Replace with proper error handling.
        console.log(error);
      }
    },

    async getCities() {
      try {
        const response = await coreService.getCities();

        this.cities = response.data.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {},
        );
      } catch (error) {
        // TODO: For dev phase only. Replace with proper error handling.
        console.log(error);
      }
    },
  },

});
