import { Amplifier } from "./amplifier";
import { generatePermutations } from "./utils";

export const runPhase = (intcodes: number[], input: number[]) => {
  let additionalInput: number = 0;
  const amplifiers = Array.from({ length: 5 }).map(
    (_, ix) => new Amplifier([...intcodes], input[ix]),
  );

  for (let i = 0; i < 5; i++) {
    const amplifier = amplifiers[i];
    amplifier.addInput(additionalInput);
    amplifier.run();

    additionalInput = amplifier.LastOutput;

    // console.log(i, amplifier.LastOutput, amplifier.done);
  }

  return additionalInput;
};

export const runAllPhases = (
  intcodes: number[],
  runner: (intcodes: number[], input: number[]) => number,
  seq = [0, 1, 2, 3, 4],
) => {
  const settings = generatePermutations(seq);
  const results = [];

  for (let index = 0; index < settings.length; index++) {
    const sequence = settings[index];

    results.push({ sequence, result: runner(intcodes, sequence) });
  }
  return results;
};

export const runPhasePartTwo = (intcodes: number[], input: number[]) => {
  let additionalInput: number = 0;
  const amplifiers = Array.from({ length: 5 }).map(
    (_, ix) => new Amplifier([...intcodes], input[ix]),
  );

  while (!amplifiers.every(amp => amp.Finished)) {
    for (let i = 0; i < 5; i++) {
      const amplifier = amplifiers[i];
      amplifier.addInput(additionalInput);
      amplifier.run();

      additionalInput = amplifier.LastOutput;
    }
  }

  return additionalInput;
};

export const preparePartOne = (intcodes: number[]) =>
  runAllPhases(intcodes, runPhase);

export const preparePartTwo = (intcodes: number[]) =>
  runAllPhases(intcodes, runPhasePartTwo, [5, 6, 7, 8, 9]);
