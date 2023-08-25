// https://stackoverflow.com/a/61108377
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
