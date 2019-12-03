import { parse } from "./parse";
import { walkPath, WalkPosition } from "./walk";

export const solvePartOne = (input: string) => {
  const [leftPath, rightPath] = parse(input);

  const left = walkPath(leftPath);
  const right = walkPath(rightPath);

  const result: number[] = [];

  let leftResults: Record<string, WalkPosition> = {};
  let next;
  while (!(next = left.next()).done) {
    const v = next.value as WalkPosition;
    leftResults[`${v.x}.${v.y}`] = v;
  }

  let rightResults: Record<string, WalkPosition> = {};
  while (!(next = right.next()).done) {
    const v = next.value as WalkPosition;
    rightResults[`${v.x}.${v.y}`] = v;
  }

  Object.keys(leftResults).forEach(lr => {
    if (rightResults[lr]) {
      const v = rightResults[lr];
      result.push(Math.abs(v.x) + Math.abs(v.y));
    }
  });

  return Math.min(...result);
};

export const solvePartTwo = (input: string) => {
  const [leftPath, rightPath] = parse(input);

  const left = walkPath(leftPath);
  const right = walkPath(rightPath);

  const result: number[] = [];

  let leftResults: Record<string, WalkPosition> = {};
  let next;
  while (!(next = left.next()).done) {
    const v = next.value as WalkPosition;
    leftResults[`${v.x}.${v.y}`] = v;
  }

  let rightResults: Record<string, WalkPosition> = {};
  while (!(next = right.next()).done) {
    const v = next.value as WalkPosition;
    rightResults[`${v.x}.${v.y}`] = v;
  }

  Object.keys(leftResults).forEach(lr => {
    if (rightResults[lr]) {
      const v = rightResults[lr];
      result.push(leftResults[lr].step + rightResults[lr].step);
    }
  });

  return Math.min(...result);
};
