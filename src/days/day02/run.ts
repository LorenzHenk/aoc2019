const STEP = 4;

export const run = (intcodes: number[]) => {
  const ic = [...intcodes];
  for (let i = 0; i < ic.length; i += STEP) {
    const opcode = ic[i];
    if (opcode === 99) {
      break;
    }
    const inputLocations = [ic[i + 1], ic[i + 2]];
    const inputs = [ic[inputLocations[0]], ic[inputLocations[1]]];
    const outputLocation = ic[i + 3];
    let result: number;
    if (opcode === 1) {
      result = inputs[0] + inputs[1];
    } else {
      result = inputs[0] * inputs[1];
    }
    ic[outputLocation] = result;
  }
  return ic;
};
