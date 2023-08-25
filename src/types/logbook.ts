import { type Optional } from "./utility";

// Crag
export interface Crag {
  readonly id: number;
  name: string;
  country: number;
}

export type CragRequest = Omit<Crag, "id">;

export interface CragMultiselect {
  readonly id: number;
  readonly name: string;
  readonly country: string;
}

// Sector
export interface Sector {
  readonly id: number;
  name: string;
  crag: number;
}

export type SectorRequest = Omit<Sector, "id">;

export interface SectorMultiselect {
  readonly id: number;
  readonly name: string;
  readonly crag: string;
  readonly country: string;
}

// Route
export interface Route {
  readonly id: number;
  name: string;
  sector: number;
  grade: number;
}

export type RouteRequest = Omit<Route, "id">;

export interface RouteMultiselect {
  readonly id: number;
  readonly name: string;
  readonly sector: string;
  readonly crag: string;
  readonly grade: string;
}

// Ascent
export interface Ascent {
  readonly id: number;
  readonly date_added: Date;
  readonly date_last_edited: Date | null;
  readonly repeat: boolean;
  second_go: boolean;
  personal_grade_flag?: PersonalGradeFlag;
  date: string;
  first_ascent: boolean;
  recommended: boolean;
  quality: number | null;
  comment: string;
  route: number;
  style: number;
  personal_grade: number;
}

export type AscentRequest = Omit<
  Optional<
    Ascent,
    | "comment"
    | "first_ascent"
    | "personal_grade"
    | "personal_grade_flag"
    | "quality"
    | "recommended"
    | "second_go"
    | "style"
  >,
  "id" | "date_added" | "date_last_edited" | "repeat"
>;

// Style
export interface Style {
  readonly id: number;
  readonly name: "Onsight" | "Flash" | "Redpoint";
  readonly shorthand: "os" | "fl" | "rp";
}

// Grade
export interface Grade {
  readonly id: number;
  readonly weight: number;
  readonly fr_route: string;
  readonly yds_route: string;
}

export type PersonalGradeFlag = "soft" | "hard";

export interface TopGrade {
  readonly style: Style;
  readonly grade: Grade;
}
