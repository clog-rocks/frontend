// Country
export interface Country {
  readonly id: number;
  readonly name: string;
  readonly code2: string;
  readonly code3: string;
}

// City
export interface City {
  readonly id: number;
  name: string;
  country: number;
}

export type CityRequest = Omit<City, "id">;
