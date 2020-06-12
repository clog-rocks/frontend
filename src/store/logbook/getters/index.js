import { differenceInDays, parseISO } from "date-fns";

export default {

  ASCENT_COUNT: (state) => Object.keys(state.ascents).length,

  _ASCENT_LAST_YEAR: (state) =>
    Object.entries(state.ascents).filter(
      (ascent) =>
        differenceInDays(new Date(parseISO(ascent[1].date)), new Date()) >= -365
    ),

  ASCENT_LAST_YEAR_COUNT: (_state, getters) => getters._ASCENT_LAST_YEAR.length,

  CRAG_VISIT_COUNT: (state) =>
    [...new Set(Object.entries(state.ascents).map((x) => x.date))].length,

  CRAG_VISIT_LAST_YEAR_COUNT: (_state, getters) =>
    [...new Set(Object.entries(getters._ASCENT_LAST_YEAR).map((x) => x.date))]
      .length,

  // WIP
  // TOP_ONSIGHT: (state) =>
  //   Math.max(...state.ascents.filter((x) => x.style === 1).map((o) => o.y), 0),
  //
  // TOP_FLASH: (state) =>
  //   Math.max(...state.ascents.filter((x) => x.style === 2).map((o) => o.y), 0),
  //
  // TOP_REDPOINT: (state) =>
  //   Math.max(...state.ascents.filter((x) => x.style === 3).map((o) => o.y), 0),
};
