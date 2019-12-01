export type DaySolver = (input: string) => any;

export interface Day {
  partOne?: DaySolver;
  partTwo?: DaySolver;
  input: string;
}
