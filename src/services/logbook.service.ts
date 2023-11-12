import type {
  Crag,
  CragRequest,
  Grade,
  Route,
  RouteRequest,
  Sector,
  SectorRequest,
  Style,
} from "@/types/logbook";
import type {
  Ascent,
  CreateAscentRequest,
  PatchAscentRequest,
} from "@/types/logbook/ascent";

import api from "./api";

export default {
  ascent: {
    create: async (payload: CreateAscentRequest): Promise<Ascent> => {
      const response = await api.post("/api/logbook/ascents", payload);
      return response.data;
    },
    delete: async (id: number) => {
      const response = await api.delete(`/api/logbook/ascents/${id}`);
      return response;
    },
    fetch: async (): Promise<Ascent[]> => {
      const response = await api.get("/api/logbook/ascents");
      return response.data;
    },
    update: async (
      id: number,
      payload: PatchAscentRequest,
    ): Promise<Ascent> => {
      const response = await api.patch(`/api/logbook/ascents/${id}`, payload);
      return response.data;
    },
  },
  crag: {
    create: async (payload: CragRequest): Promise<Crag> => {
      const response = await api.post("/api/logbook/crags", payload);
      return response.data;
    },
    fetch: async (): Promise<Crag[]> => {
      const response = await api.get("/api/logbook/crags");
      return response.data;
    },
  },
  grade: {
    fetch: async (): Promise<Grade[]> => {
      const response = await api.get("/api/logbook/grades");
      return response.data;
    },
  },
  route: {
    create: async (payload: RouteRequest): Promise<Route> => {
      const response = await api.post("/api/logbook/routes", payload);
      return response.data;
    },
    fetch: async (): Promise<Route[]> => {
      const response = await api.get("/api/logbook/routes");
      return response.data;
    },
  },
  sector: {
    create: async (payload: SectorRequest): Promise<Sector> => {
      const response = await api.post("/api/logbook/sectors", payload);
      return response.data;
    },
    fetch: async (): Promise<Sector[]> => {
      const response = await api.get("/api/logbook/sectors");
      return response.data;
    },
  },
  style: {
    fetch: async (): Promise<Style[]> => {
      const response = await api.get("/api/logbook/styles");
      return response.data;
    },
  },
};
