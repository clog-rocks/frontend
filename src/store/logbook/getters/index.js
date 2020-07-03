import { differenceInDays, parseISO } from "date-fns";

export default {
  ASCENT_COUNT: (state) => Object.keys(state.data).length,

  ASCENT_LAST_YEAR: (state) => Object.values(state.data)
    .filter((ascent) => differenceInDays(
      new Date(parseISO(ascent.date)),
      new Date(),
    ) >= -365),

  ASCENT_LAST_YEAR_COUNT: (_state, getters) => getters.ASCENT_LAST_YEAR.length,

  CRAG_VISIT_COUNT: (state) => [
    ...new Set(Object.values(state.data)
      .map((x) => x.date)),
  ].length,

  CRAG_VISIT_LAST_YEAR_COUNT: (_state, getters) => [
    ...new Set(Object.values(getters.ASCENT_LAST_YEAR)
      .map((x) => x.date)),
  ].length,

  TOP_GRADES: (state) => {
    const get_max_grade_for_style = (style) => state.grades[
      Math.max(
        ...Object.values(state.data)
          .filter((x) => x.style.id === style)
          .map((x) => x.route.grade.id),
      )
    ];

    return Object.values(state.styles)
      .reduce((acc, style) => {
        acc.push({
          ...get_max_grade_for_style(style.id),
          style: state.styles[style.id].name.toLowerCase(),
        });

        return acc;
      }, [])
      .sort((a, b) => (a.weight < b.weight ? 1 : -1));
  },
};
