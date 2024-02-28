import type { CityTree } from "./core";

// Gym
export interface Gym {
  readonly id: number;
  name: string;
  city: number;
}

export type GymRequest = Omit<Gym, "id">;

export type GymTree = Readonly<Omit<Gym, "city"> & { city: CityTree }>;

// Training session
export interface TrainingSession {
  readonly id: number;
  readonly date_added: string;
  readonly date_last_edited: string | null;
  gym: number;
  date: string;
  comment: string | null;
  tags: string[];
}

export type TrainingSessionRequest = {
  gym: number;
  date: string;
  comment?: string;
  tags?: string[];
};

export type TrainingSessionTree = Readonly<
  Omit<TrainingSession, "gym"> & { gym: GymTree }
>;

export interface GymMultiselect {
  readonly id: number;
  readonly gym: string;
  readonly city: string;
  readonly country: string;
}
