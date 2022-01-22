import _ from "lodash";
import { defineStore } from "pinia";
import { trainingService } from "@/_services";

// TODO: rename actions and getters.

export const useTrainingStore = defineStore({
  id: "training",
  state: () => {
    return {
      loading: false,
      gyms: {},
      data: {},

      dataRetrieved: false,
    };
  },

  actions: {
    async GET_DATA() {
      try {
        const response = await trainingService.getData();

        this.data = response.data.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {},
        );

        this.dataRetrieved = true;

        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async _getGyms() {
      try {
        const response = await trainingService.getGyms();

        this.gyms = response.data.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {},
        );
      } catch (error) {
        // console.log(error);
        // commit("loginFailure", error);
        // dispatch("alert/error", error, { root: true });
      }
    },

    async _addSession(payload) {
      try {
        const response = await trainingService.addSession(payload);

        this.data = { ...this.data, [response.data.id]: response.data };

        return Promise.resolve(response);
      } catch (error) {
        console.log(error);

        // commit("loginFailure", error);
        // dispatch("alert/error", error, { root: true });
      }
    },
  },

  getters: {
    SESSIONS_COUNT: (state) => Object.keys(state.data).length,

    GYMS_COUNT: (state) => [
      ...new Set(Object.values(state.data)
        .map((session) => session.gym.id)),
    ].length,

    CITIES_COUNT: (state) => [
      ...new Set(
        Object.values(state.data)
          .map((session) => session.gym.city.id),
      ),
    ].length,

    COUNTRIES_COUNT: (state) => [
      ...new Set(
        Object.values(state.data)
          .map((session) => session.gym.city.country.id),
      ),
    ].length,

    TOP_GYMS() {
      const gyms = this._userGyms;

      return Object.entries(_.mapKeys(
        _.countBy(
          Object.values(this.data)
            .map((session) => session.gym.id),
        ),
        function(_value, key) {
          const gym = gyms[key];

          return gym.city.name + " / " + gym.name;
        },
      ))
        .sort((a, b) => b[1] - a[1]);
    },

    _userGyms: (state) => _.uniqBy(
      [
        ...new Set(Object.values(state.data)
          .map((session) => session.gym)),
      ],
      "id",
    )
      .reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {}),

  },
});
