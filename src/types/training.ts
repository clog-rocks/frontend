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
  comment: null | string;
  tags: string[];
}

export type TrainingSessionRequest = Omit<
  TrainingSession,
  "id" | "date_added" | "date_last_edited"
>;
