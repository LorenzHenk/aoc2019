export const getParameterMode = (opcode: number, ix: number) =>
  Math.floor((opcode % Math.pow(10, 3 + ix)) / Math.pow(10, 2 + ix));

export const getParameterModes = (opcode: number, length: number): Mode[] => {
  const values: number[] = Array.from({ length });
  for (let ix = 0; ix < length; ix++) {
    values[ix] = getParameterMode(opcode, ix);
  }
  return values;
};

export enum Mode {
  Reference = 0,
  Immediate = 1,
  Relative = 2,
}

export const getValue = (
  intcodes: number[],
  mode: Mode,
  value: number,
  relativeBaseOffset: number,
): number =>
  ({
    [Mode.Reference]: () => intcodes[value],
    [Mode.Immediate]: () => value,
    [Mode.Relative]: () => intcodes[relativeBaseOffset + value],
  }[mode]() ?? null);

export interface OpcodeRunnerParams {
  intcodes: number[];
  index: number;
  output: number[];
  input: number;
  relativeBaseOffset: number;
}

export interface OpcodeRunnerReturn {
  relativeBaseOffset?: number;
  instructionPointer?: number;
}

export interface OpcodeRunner {
  runner: ({
    intcodes,
    index,
    input,
    output,
  }: OpcodeRunnerParams) => OpcodeRunnerReturn | void;
  len: number;
}

const opcodes: Record<number, OpcodeRunner> = {
  1: {
    runner: ({ intcodes, index, relativeBaseOffset }) => {
      const [oc, v1, v2, out] = intcodes.slice(index);
      const [m1, m2, m3] = getParameterModes(oc, 3);
      intcodes[m3 === Mode.Reference ? out : relativeBaseOffset + out] =
        getValue(intcodes, m1, v1, relativeBaseOffset) +
        getValue(intcodes, m2, v2, relativeBaseOffset);
    },
    len: 4,
  },
  2: {
    runner: ({ intcodes, index, relativeBaseOffset }) => {
      const [oc, v1, v2, out] = intcodes.slice(index);
      const [m1, m2, m3] = getParameterModes(oc, 3);
      intcodes[m3 === Mode.Reference ? out : relativeBaseOffset + out] =
        getValue(intcodes, m1, v1, relativeBaseOffset) *
        getValue(intcodes, m2, v2, relativeBaseOffset);
    },
    len: 4,
  },
  3: {
    runner: ({ intcodes, index, input, relativeBaseOffset }) => {
      const [oc, out] = intcodes.slice(index);
      const [m1] = getParameterModes(oc, 1);
      intcodes[m1 === Mode.Reference ? out : relativeBaseOffset + out] = input;
    },
    len: 2,
  },
  4: {
    runner: ({ intcodes, index, output, relativeBaseOffset }) => {
      const [oc, inp] = intcodes.slice(index);
      const [m1] = getParameterModes(oc, 1);
      output.push(getValue(intcodes, m1, inp, relativeBaseOffset));
    },
    len: 2,
  },
  5: {
    runner: ({ intcodes, index, relativeBaseOffset }) => {
      const [oc, flag, pointer] = intcodes.slice(index);
      const [m1, m2] = getParameterModes(oc, 2);
      if (getValue(intcodes, m1, flag, relativeBaseOffset) !== 0) {
        return {
          instructionPointer: getValue(
            intcodes,
            m2,
            pointer,
            relativeBaseOffset,
          ),
        };
      }
    },
    len: 3,
  },
  6: {
    runner: ({ intcodes, index, relativeBaseOffset }) => {
      const [oc, flag, pointer] = intcodes.slice(index);
      const [m1, m2] = getParameterModes(oc, 2);
      if (getValue(intcodes, m1, flag, relativeBaseOffset) === 0) {
        return {
          instructionPointer: getValue(
            intcodes,
            m2,
            pointer,
            relativeBaseOffset,
          ),
        };
      }
    },
    len: 3,
  },
  7: {
    runner: ({ intcodes, index, relativeBaseOffset }) => {
      const [oc, v1, v2, out] = intcodes.slice(index);
      const [m1, m2, m3] = getParameterModes(oc, 3);
      if (
        getValue(intcodes, m1, v1, relativeBaseOffset) <
        getValue(intcodes, m2, v2, relativeBaseOffset)
      ) {
        intcodes[m3 === Mode.Reference ? out : relativeBaseOffset + out] = 1;
      } else {
        intcodes[m3 === Mode.Reference ? out : relativeBaseOffset + out] = 0;
      }
    },
    len: 4,
  },
  8: {
    runner: ({ intcodes, index, relativeBaseOffset }) => {
      const [oc, v1, v2, out] = intcodes.slice(index);
      const [m1, m2, m3] = getParameterModes(oc, 3);
      if (
        getValue(intcodes, m1, v1, relativeBaseOffset) ===
        getValue(intcodes, m2, v2, relativeBaseOffset)
      ) {
        intcodes[m3 === Mode.Reference ? out : relativeBaseOffset + out] = 1;
      } else {
        intcodes[m3 === Mode.Reference ? out : relativeBaseOffset + out] = 0;
      }
    },
    len: 4,
  },
  9: {
    runner: ({ intcodes, relativeBaseOffset, index }) => {
      const [oc, offset] = intcodes.slice(index);
      const [offsetMode] = getParameterModes(oc, 1);
      return {
        relativeBaseOffset:
          relativeBaseOffset +
          getValue(intcodes, offsetMode, offset, relativeBaseOffset),
      };
    },
    len: 2,
  },
};

export const runPartOne = (intcodes: number[], input: number) => {
  const ic = [...intcodes];
  const output: number[] = [];
  let relativeBaseOffset = 0;
  for (let i = 0; i < ic.length; ) {
    const opcode = ic[i];
    if (opcode === 99) {
      break;
    }
    const { runner, len } = opcodes[opcode % 100];
    const result = runner({
      intcodes: ic,
      index: i,
      output,
      input,
      relativeBaseOffset,
    });
    if (typeof result === "object") {
      if (typeof result.instructionPointer === "number") {
        i = result.instructionPointer;
      } else {
        i += len;
      }
      if (typeof result.relativeBaseOffset === "number") {
        relativeBaseOffset = result.relativeBaseOffset;
      }
    } else {
      i += len;
    }
  }
  return { ic, output };
};

export const runPartTwo = runPartOne;
