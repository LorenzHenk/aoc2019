export enum Direction {
  Up = "U",
  Right = "R",
  Down = "D",
  Left = "L",
}

export interface Task {
  direction: Direction;
  distance: number;
}

export type Path = Task[];

export const parseLine = (input: string): Path =>
  input
    .split(",")
    .map(t => t.trim())
    .map(t => ({
      direction: t[0] as Direction,
      distance: parseInt(t.slice(1)),
    }));

export const parse = (input: string) => input.split("\n").map(parseLine);
