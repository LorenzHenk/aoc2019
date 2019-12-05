export const getParameterMode = (opcode: number, ix: number) =>
  Math.floor((opcode % Math.pow(10, 3 + ix)) / Math.pow(10, 2 + ix));

export const getParameterModes = (opcode: number, length: number) => {
  const values: number[] = Array.from({ length });
  for (let ix = 0; ix < length; ix++) {
    values[ix] = getParameterMode(opcode, ix);
  }
  return values;
};

export enum Mode {
  Reference = 0,
  Immediate = 1,
}

export const getValue = (intcodes: number[], mode: Mode, value: number) =>
  mode === Mode.Reference ? intcodes[value] : value;

export interface OpcodeRunnerParams {
  intcodes: number[];
  index: number;
  output: number[];
  input: number;
}
export interface OpcodeRunner {
  runner: ({
    intcodes,
    index,
    input,
    output,
  }: OpcodeRunnerParams) => number | void;
  len?: number;
}

const opcodes: Record<number, OpcodeRunner> = {
  1: {
    runner: ({ intcodes, index }) => {
      const [oc, v1, v2, out] = intcodes.slice(index);
      const [m1, m2] = getParameterModes(oc, 2);
      intcodes[out] = getValue(intcodes, m1, v1) + getValue(intcodes, m2, v2);
    },
    len: 4,
  },
  2: {
    runner: ({ intcodes, index }) => {
      const [oc, v1, v2, out] = intcodes.slice(index);
      const [m1, m2] = getParameterModes(oc, 2);
      intcodes[out] = getValue(intcodes, m1, v1) * getValue(intcodes, m2, v2);
    },
    len: 4,
  },
  3: {
    runner: ({ intcodes, index, input }) => {
      const [oc, out] = intcodes.slice(index);
      intcodes[out] = input;
    },
    len: 2,
  },
  4: {
    runner: ({ intcodes, index, output }) => {
      const [oc, inp] = intcodes.slice(index);
      const [m1] = getParameterModes(oc, 1);
      output.push(getValue(intcodes, m1, inp));
    },
    len: 2,
  },
  5: {
    runner: ({ intcodes, index }) => {
      const [oc, flag, pointer] = intcodes.slice(index);
      const [m1, m2] = getParameterModes(oc, 2);
      if (getValue(intcodes, m1, flag) !== 0) {
        return getValue(intcodes, m2, pointer);
      }
    },
    len: 3,
  },
  6: {
    runner: ({ intcodes, index }) => {
      const [oc, flag, pointer] = intcodes.slice(index);
      const [m1, m2] = getParameterModes(oc, 2);
      if (getValue(intcodes, m1, flag) === 0) {
        return getValue(intcodes, m2, pointer);
      }
    },
    len: 3,
  },
  7: {
    runner: ({ intcodes, index }) => {
      const [oc, v1, v2, out] = intcodes.slice(index);
      const [m1, m2] = getParameterModes(oc, 2);
      if (getValue(intcodes, m1, v1) < getValue(intcodes, m2, v2)) {
        intcodes[out] = 1;
      } else {
        intcodes[out] = 0;
      }
    },
    len: 4,
  },
  8: {
    runner: ({ intcodes, index }) => {
      const [oc, v1, v2, out] = intcodes.slice(index);
      const [m1, m2] = getParameterModes(oc, 2);
      if (getValue(intcodes, m1, v1) === getValue(intcodes, m2, v2)) {
        intcodes[out] = 1;
      } else {
        intcodes[out] = 0;
      }
    },
    len: 4,
  },
};

export const runPartOne = (intcodes: number[], input: number = 1) => {
  const ic = [...intcodes];
  const output: number[] = [];
  for (let i = 0; i < ic.length; ) {
    const opcode = ic[i];
    if (opcode === 99) {
      break;
    }
    const { runner, len } = opcodes[opcode % 100];
    runner({ intcodes: ic, index: i, output, input });
    i += len!;
  }
  return { ic, output };
};

export const runPartTwo = (intcodes: number[], input: number = 5) => {
  const ic = [...intcodes];
  const output: number[] = [];
  for (let i = 0; i < ic.length; ) {
    const opcode = ic[i];
    if (opcode === 99) {
      break;
    }
    const { runner, len } = opcodes[opcode % 100];
    const result = runner({ intcodes: ic, index: i, output, input });
    if (typeof result === "number") {
      i = result;
    } else {
      i += len!;
    }
  }
  return { ic, output };
};
