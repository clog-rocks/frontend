// Crag
export interface Crag {
  readonly id: number;
  name: string;
  country: number;
}

export type CragRequest = Omit<Crag, "id">;

// Sector
export interface Sector {
  readonly id: number;
  name: string;
  crag: number;
}

export type SectorRequest = Omit<Sector, "id">;

// Route
export interface Route {
  readonly id: number;
  name: string;
  sector: Sector;
  grade: number;
}

export type RouteRequest = Omit<Route, "id">;

// Ascent
export interface Ascent {
  readonly id: number;
  readonly date_added: Date;
  readonly date_last_edited: Date | null;
  readonly repeat: boolean;
  second_go: boolean;
  personal_grade_flag?: "soft" | "hard" | null;
  date: string;
  first_ascent: boolean;
  recommended: boolean;
  quality: number | null;
  comment: null | string;
  route: number;
  style: number;
  personal_grade?: number | null;
}

export type AscentRequest = Omit<
  Ascent,
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

export interface TopGrade {
  readonly style: Style;
  readonly grade: Grade;
}
