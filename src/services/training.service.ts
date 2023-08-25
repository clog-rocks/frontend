import type { Tag } from "@/types/generic";
import type {
  Gym,
  GymRequest,
  TrainingSession,
  TrainingSessionRequest,
} from "@/types/training";

import api from "./api";

export default {
  gym: {
    create: async (payload: GymRequest): Promise<Gym> => {
      const response = await api.post("/api/training/gyms", payload);
      return response.data;
    },
    fetch: async (search?: string): Promise<Gym[]> => {
      let url = "/api/training/gyms";

      if (search) {
        const params = new URLSearchParams();
        params.append("name", search);

        url = `${url}?${params.toString()}`;
      }

      const response = await api.get(url);
      return response.data;
    },
  },
  session: {
    create: async (
      payload: TrainingSessionRequest,
    ): Promise<TrainingSession> => {
      const response = await api.post("/api/training/sessions", payload);
      return response.data;
    },
    delete: async (id: number) => {
      const response = await api.delete(`/api/training/sessions/${id}`);
      return response;
    },
    fetch: async (): Promise<TrainingSession[]> => {
      const response = await api.get("/api/training/sessions");
      return response.data;
    },
    update: async (id: number, payload: TrainingSessionRequest) => {
      const response = await api.patch(`/api/training/sessions/${id}`, payload);
      return response;
    },
  },
  tag: {
    fetch: async (search?: string): Promise<Tag[]> => {
      let url = "/api/training/tags";

      if (search) {
        const params = new URLSearchParams();
        params.append("name", search);
        url = `${url}?${params.toString()}`;
      }

      const response = await api.get(url);
      return response.data;
    },
  },
};
