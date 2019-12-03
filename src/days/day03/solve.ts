import { parse } from "./parse";
import { walkPath } from "./walk";

export const solvePartOne = (input: string) => {
  const [leftPath, rightPath] = parse(input);

  const left = walkPath(leftPath);
  const right = walkPath(rightPath);

  const result = [];

  let resLeft = left.next();
  let resRight = right.next();

  while (!resLeft.done && !resRight.done) {
    if (
      resLeft.value.x === resRight.value.x &&
      resLeft.value.y === resRight.value.y
    ) {
      console.log("CROSSING", resLeft.value.x, resLeft.value.y);
      result.push(Math.abs(resLeft.value.x) + Math.abs(resLeft.value.y));
    }

    const tempResLeft = left.next();
    const tempResRight = right.next();
    if (tempResLeft.done && tempResRight.done) {
      break;
    }
    if (!tempResLeft.done) {
      resLeft = tempResLeft;
    }
    if (!tempResRight.done) {
      resRight = tempResRight;
    }
  }

  return Math.min(...result);
};
