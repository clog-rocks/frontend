import type { City, Country } from "@/types/core";

import api from "./api";

export default {
  fetchCountries: async (): Promise<Country[]> => {
    const response = await api.get("/api/core/countries");
    return response.data;
  },

  fetchCities: async (): Promise<City[]> => {
    const response = await api.get("/api/core/cities");
    return response.data;
  },
};
