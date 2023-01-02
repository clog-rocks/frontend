import type {
  Ascent,
  AscentRequest,
  Crag,
  Grade,
  Route,
  Sector,
  Style,
} from "@/types/logbook";

import api from "./api";

export default {
  fetchGrades: async (): Promise<Grade[]> => {
    const response = await api.get("/api/logbook/grades");
    return response.data;
  },

  fetchStyles: async (): Promise<Style[]> => {
    const response = await api.get("/api/logbook/styles");
    return response.data;
  },

  fetchCrags: async (): Promise<Crag[]> => {
    const response = await api.get("/api/logbook/crags");
    return response.data;
  },

  fetchSectors: async (): Promise<Sector[]> => {
    const response = await api.get("/api/logbook/sectors");
    return response.data;
  },

  fetchRoutes: async (): Promise<Route[]> => {
    const response = await api.get("/api/logbook/routes");
    return response.data;
  },

  // Ascent
  fetchAscents: async (): Promise<Ascent[]> => {
    const response = await api.get("/api/logbook/ascents");
    return response.data;
  },

  addAscent: async (payload: AscentRequest): Promise<Ascent> => {
    const response = await api.post("/api/logbook/ascents", payload);
    return response.data;
  },

  deleteAscent: async (id: number) => {
    const response = await api.delete(`/api/logbook/ascents/${id}`);
    return response;
  },
};
