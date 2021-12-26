import api from "./api";

export default {
  // TODO: validate search
  getGyms: async (search) => {
    const url = `/api/training/gym?name=${search}`;

    return await api.get(url);
  },

  getData: async () => await api.get("/api/training/"),

  addSession: async (payload) => await api.post("/api/training/", payload),
};
