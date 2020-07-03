import api from "./api";

export default {
  getCountries: async () => await api.get("/api/core/country/"),

  getCities: async () => await api.get("/api/core/city/"),
};
