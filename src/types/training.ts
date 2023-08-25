import { type Optional } from "./utility";

// Gym
export interface Gym {
  readonly id: number;
  name: string;
  city: number;
}

export type GymRequest = Omit<Gym, "id">;

// Training session
export interface TrainingSession {
  readonly id: number;
  readonly date_added: Date;
  readonly date_last_edited: Date | null;
  gym: number;
  date: string;
  comment: string | null;
  tags: string[];
}

export type TrainingSessionRequest = Omit<
  Optional<TrainingSession, "comment">,
  "id" | "date_added" | "date_last_edited"
>;

export interface GymMultiselect {
  readonly id: number;
  readonly gym: string;
  readonly city: string;
  readonly country: string;
}
