import api from "./api";

export default {
  getGyms: async () => await api.get("/api/training/gym/"),

  getSessions: async () => await api.get("/api/training/session/"),

  getData: async () => await api.get("/api/training/"),
};
