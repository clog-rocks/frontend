import api from "./api";

export default {
  getGyms: async (search) => {
    const url = "/api/training/gym/?";
    const params = new URLSearchParams();

    params.append("name", search);

    return await api.get(url + params.toString());
  },

  getData: async () => await api.get("/api/training/sessions/"),

  addSession: async (payload) => await api.post("/api/training/sessions/", payload),
};
