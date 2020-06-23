import api from "./api";

export default {
  getGrades: async () => {
    return await api.get("/api/logbook/grade/");
  },

  getStyles: async () => {
    return await api.get("/api/logbook/style/");
  },

  getCrags: async () => {
    return await api.get("/api/logbook/crag/");
  },

  getSectors: async () => {
    return await api.get("/api/logbook/sector/");
  },

  getRoutes: async () => {
    return await api.get("/api/logbook/route/");
  },

  getAscents: async () => {
    return await api.get("/api/logbook/ascent/");
  },
};
