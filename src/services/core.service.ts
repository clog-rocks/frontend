import type { City, Country, Tag } from "@/types/core";

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

  fetchTags: async (search: string): Promise<Tag[]> => {
    const url = "/api/core/tags?";
    const params = new URLSearchParams();

    params.append("name", search);

    const response = await api.get(url + params.toString());
    return response.data;
  },
};
