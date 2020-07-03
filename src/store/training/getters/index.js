import _ from "lodash";

export default {
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

  TOP_GYMS: (state, getters) => Object.entries(_.mapKeys(
    _.countBy(
      Object.values(state.data)
        .map((session) => session.gym.id),
    ),
    function(_value, key) {
      const gym = getters._userGyms[key];

      return gym.city.name + " / " + gym.name;
    },
  ))
    .sort((a, b) => b[1] - a[1]),

  _userGyms: (state) => _.uniqBy(
    [
      ...new Set(Object.values(state.data)
        .map((session) => session.gym)),
    ],
    "id",
  )
    .reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {}),
};
