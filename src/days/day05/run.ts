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

export interface OpcodeRunner {
  runner: (ic: number[], ix: number) => any;
  len: number;
}

const opcodes: Record<number, OpcodeRunner> = {
  1: {
    runner: (ic: number[], ix: number) => {
      const [oc, v1, v2, out] = ic.slice(ix);
      const [m1, m2] = getParameterModes(oc, 2);
      ic[out] = getValue(ic, m1, v1) + getValue(ic, m2, v2);
    },
    len: 4,
  },
  2: {
    runner: (ic: number[], ix: number) => {
      const [oc, v1, v2, out] = ic.slice(ix);
      const [m1, m2] = getParameterModes(oc, 2);
      ic[out] = getValue(ic, m1, v1) * getValue(ic, m2, v2);
    },
    len: 4,
  },
  3: {
    runner: (ic: number[], ix: number) => {
      const [oc, out] = ic.slice(ix);
      // input is set to 1
      ic[out] = 1;
    },
    len: 2,
  },
  4: {
    runner: (ic: number[], ix: number) => {
      const [oc, inp] = ic.slice(ix);
      // input is set to 1
      return ic[inp];
    },
    len: 2,
  },
};

export const run = (intcodes: number[]) => {
  const ic = [...intcodes];
  for (let i = 0; i < ic.length; ) {
    const opcode = ic[i];
    if (opcode === 99) {
      break;
    }
    const { runner, len } = opcodes[opcode % 100];
    const result = runner(ic, i);
    if (typeof result === "number") {
      console.log(result);
    }
    i += len;
  }
  return ic;
};
