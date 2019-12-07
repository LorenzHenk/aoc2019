import { run } from "./run";

export const runPhase = (intcodes: number[], input: number[]) => {
  let additionalInput: number = 0;
  for (let i = 0; i < 5; i++) {
    additionalInput = run(intcodes, [input[i], additionalInput]).output[0];
  }

  return additionalInput;
};

export const runAllPhases = (intcodes: number[]) => {
  const results = [];

  let sequence: number[];
  for (let a = 0; a < 5; a++) {
    for (let b = 0; b < 5; b++) {
      if (a === b) continue;
      for (let c = 0; c < 5; c++) {
        if (a === c || b === c) continue;
        for (let d = 0; d < 5; d++) {
          if (a === d || b === d || c === d) continue;
          for (let e = 0; e < 5; e++) {
            if (a === e || b === e || c === e || d === e) continue;
            sequence = [a, b, c, d, e];
            results.push({ sequence, result: runPhase(intcodes, sequence) });
          }
        }
      }
    }
  }
  return results;
};
