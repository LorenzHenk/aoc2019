import { parse } from "./parse";
import { run } from "./run";

export const solvePartOne = (input: string) => {
  const intcode = parse(input);
  intcode[1] = 12;
  intcode[2] = 2;
  const result = run(intcode);

  return result[0];
};

export const solvePartTwo = (input: string) => {
  const originalIntcode = parse(input);
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const ic = [...originalIntcode];
      ic[1] = noun;
      ic[2] = verb;
      const result = run(ic);

      if (result[0] === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
};
