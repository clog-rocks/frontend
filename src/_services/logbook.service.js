import api from "./api";

export default {
  getGrades: async () => await api.get("/api/logbook/grade/"),

  getStyles: async () => await api.get("/api/logbook/style/"),

  getCrags: async () => await api.get("/api/logbook/crag/"),

  getSectors: async () => await api.get("/api/logbook/sector/"),

  getRoutes: async () => await api.get("/api/logbook/route/"),

  getAscents: async () => await api.get("/api/logbook/ascent/"),

  getData: async () => await api.get("/api/logbook/"),
};
