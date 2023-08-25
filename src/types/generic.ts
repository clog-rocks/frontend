export type StoreStatus = "PENDING" | "FETCHING" | "FETCHED" | "FAILED";

export interface CounterItemProps {
  value: number | string;
  legend: string;
}

export interface Tag {
  name: string;
}
