export interface User {
  readonly id: number;
  readonly date_joined: Date;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface Profile {
  grading_system: "fr" | "yds";
}

export interface UserResponse {
  user: User;
  profile: Profile;
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
}

export interface UserAvailable {
  username: string;
  available: boolean;
}
