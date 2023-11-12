import type { Country } from "./core";

// Crag
export type CragRequest = {
  name: string;
  country: number;
};

export type Crag = CragRequest & { readonly id: number };
export type CragTree = Omit<Crag, "country"> & { country: Country };

export type CragMultiselect = {
  readonly id: number;
  readonly name: string;
  readonly country: string;
};

// Sector
export type SectorRequest = {
  name: string;
  crag: number;
};

export type Sector = SectorRequest & { readonly id: number };
export type SectorTree = Omit<Sector, "crag"> & { crag: CragTree };

export type SectorMultiselect = {
  readonly id: number;
  readonly name: string;
  readonly crag: string;
  readonly country: string;
};

// Route
export type RouteRequest = {
  name: string;
  sector: number;
  grade: number;
};

export type Route = RouteRequest & { readonly id: number };

export type RouteTree = Omit<Route, "sector" | "grade"> & {
  sector: SectorTree;
  grade: Grade;
};

export type RouteMultiselect = {
  readonly id: number;
  readonly name: string;
  readonly sector: string;
  readonly crag: string;
  readonly grade: string;
};

// Style
export type Style = {
  readonly id: number;
  readonly name: "Onsight" | "Flash" | "Redpoint";
  readonly shorthand: "os" | "fl" | "rp";
};

// Grade
export type Grade = {
  readonly id: number;
  readonly weight: number;
  readonly fr_route: string;
  readonly yds_route: string;
};

export type TopGrade = {
  readonly style: Style;
  readonly grade: Grade;
};
