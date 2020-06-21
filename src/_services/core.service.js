import api from "./api";

export default {
  getCountries: async () => {
    return await api.get("/api/core/country/");
  },

  getCities: async () => {
    return await api.get("/api/core/city/");
  },
};
