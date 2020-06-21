import _ from "lodash";

export default {
  SESSIONS_COUNT: (state) => Object.keys(state.data).length,

  GYMS_COUNT: (state) =>
    [...new Set(Object.values(state.data).map((session) => session.gym.id))]
      .length,

  CITIES_COUNT: (state) =>
    [
      ...new Set(
        Object.values(state.data).map((session) => session.gym.city.id)
      ),
    ].length,

  COUNTRIES_COUNT: (state) =>
    [
      ...new Set(
        Object.values(state.data).map((session) => session.gym.city.country.id)
      ),
    ].length,

  TOP_GYMS: (state) =>
    _.countBy(Object.values(state.data).map((session) => session.gym.id)),

  _userGyms: (state) =>
    _.uniqBy(
      [...new Set(Object.values(state.data).map((session) => session.gym))],
      "id"
    ),
};
