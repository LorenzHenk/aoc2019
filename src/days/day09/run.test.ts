import { getValue, Mode, runPartOne, runPartTwo } from "./run";
import { parse } from "./parse";

test("getValue", () => {
  const ic = [1, 2, 3];
  expect(getValue(ic, Mode.Reference, 0, 0)).toEqual(1);
  expect(getValue(ic, Mode.Reference, 1, 0)).toEqual(2);
  expect(getValue(ic, Mode.Reference, 2, 0)).toEqual(3);
  expect(getValue(ic, Mode.Immediate, -5, 0)).toEqual(-5);
  expect(getValue(ic, Mode.Immediate, 20, 0)).toEqual(20);
});

describe("runPartOne", () => {
  test("Run `109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99`", () => {
    const input = `109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99`;
    const ic = parse(input);
    const result = runPartOne(ic, 0);
    expect(result.output.join(",")).toEqual(input);
  });

  test("Run `1102,34915192,34915192,7,4,7,99,0`", () => {
    const input = `1102,34915192,34915192,7,4,7,99,0`;
    const ic = parse(input);
    const result = runPartOne(ic, 0);
    expect(result.output[result.output.length - 1].toString().length).toEqual(
      16,
    );
  });

  test("Run `104,1125899906842624,99`", () => {
    const input = `104,1125899906842624,99`;
    const ic = parse(input);
    const result = runPartOne(ic, 0);
    expect(result.output[result.output.length - 1]).toEqual(ic[1]);
  });
});

describe("runPartTwo", () => {
  test("`3,9,8,9,10,9,4,9,99,-1,8`", () => {
    const input = `3,9,8,9,10,9,4,9,99,-1,8`;
    const ic = parse(input);
    expect(runPartTwo(ic, 8).output[0]).toEqual(1);
    expect(runPartTwo(ic, 10).output[0]).toEqual(0);
  });

  test("`3,9,7,9,10,9,4,9,99,-1,8`", () => {
    const input = `3,9,7,9,10,9,4,9,99,-1,8`;
    const ic = parse(input);
    expect(runPartTwo(ic, 7).output[0]).toEqual(1);
    expect(runPartTwo(ic, 8).output[0]).toEqual(0);
  });

  test("`3,3,1108,-1,8,3,4,3,99`", () => {
    const input = `3,3,1108,-1,8,3,4,3,99`;
    const ic = parse(input);
    expect(runPartTwo(ic, 8).output[0]).toEqual(1);
    expect(runPartTwo(ic, 10).output[0]).toEqual(0);
  });

  test("`3,3,1107,-1,8,3,4,3,99`", () => {
    const input = `3,3,1107,-1,8,3,4,3,99`;
    const ic = parse(input);
    expect(runPartTwo(ic, 7).output[0]).toEqual(1);
    expect(runPartTwo(ic, 8).output[0]).toEqual(0);
  });

  test("`3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9`", () => {
    const input = `3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9`;
    const ic = parse(input);
    expect(runPartTwo(ic, 0).output[0]).toEqual(0);
    expect(runPartTwo(ic, 1).output[0]).toEqual(1);
  });

  test("`3,3,1105,-1,9,1101,0,0,12,4,12,99,1`", () => {
    const input = `3,3,1105,-1,9,1101,0,0,12,4,12,99,1`;
    const ic = parse(input);
    expect(runPartTwo(ic, 0).output[0]).toEqual(0);
    expect(runPartTwo(ic, 1).output[0]).toEqual(1);
  });

  test("last example", () => {
    const input = `3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99`;
    const ic = parse(input);
    expect(runPartTwo(ic, 6).output.slice(-1)).toEqual([999]);
    expect(runPartTwo(ic, 8).output.slice(-1)).toEqual([1000]);
    expect(runPartTwo(ic, 10).output.slice(-1)).toEqual([1001]);
  });
});
