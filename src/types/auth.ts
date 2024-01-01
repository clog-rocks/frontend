export interface User {
  readonly id: number;
  readonly date_joined: Date;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  profile: Profile;
}

export interface UserRequest {
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
  new_password?: string;
  profile: Profile;
}

export interface Profile {
  grading_system: "fr" | "yds";
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
