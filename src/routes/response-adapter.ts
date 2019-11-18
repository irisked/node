export interface ResponseAdapter<D, T> {
  adapt(data: D): T;
}
