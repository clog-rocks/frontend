import api from "./api";

export default {
  getGyms: async () => {
    return await api.get("/api/training/gym/");
  },

  getSessions: async () => {
    return await api.get("/api/training/session/");
  },

  getData: async () => {
    return await api.get("/api/training/");
  },
};
