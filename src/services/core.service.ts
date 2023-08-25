import type { City, CityRequest, Country } from "@/types/core";

import api from "./api";

export default {
  country: {
    fetch: async (): Promise<Country[]> => {
      const response = await api.get("/api/core/countries");
      return response.data;
    },
  },
  city: {
    create: async (payload: CityRequest): Promise<City> => {
      const response = await api.post("/api/core/cities", payload);
      return response.data;
    },
    fetch: async (): Promise<City[]> => {
      const response = await api.get("/api/core/cities");
      return response.data;
    },
  },
};
