import api from "./api";

export default {
  getCountries: async () => await api.get("/api/core/country/"),

  getCities: async () => await api.get("/api/core/city/"),

  getTags: async (search) => {
    const url = "/api/core/tag/?";
    const params = new URLSearchParams();

    params.append("name", search);

    return await api.get(url + params.toString());
  },
};
