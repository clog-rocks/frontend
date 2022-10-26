import type {
  Gym,
  TrainingSession,
  TrainingSessionRequest,
} from "@/types/training";

import api from "./api";

export default {
  fetchGyms: async (search?: string): Promise<Gym[]> => {
    let url = "/api/training/gyms";

    if (search) {
      const params = new URLSearchParams();
      params.append("name", search);

      url = `${url}?${params.toString()}`;
    }

    const response = await api.get(url);
    return response.data;
  },

  // Training session
  fetchSessions: async (): Promise<TrainingSession[]> => {
    const response = await api.get("/api/training/sessions");
    return response.data;
  },

  addSession: async (
    payload: TrainingSessionRequest
  ): Promise<TrainingSession> => {
    const response = await api.post("/api/training/sessions", payload);
    return response.data;
  },

  deleteSession: async (id: number) => {
    const response = await api.delete(`/api/training/sessions/${id}`);
    return response;
  },
};
