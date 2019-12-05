import {
  getParameterMode,
  getParameterModes,
  getValue,
  Mode,
  runPartOne,
  runPartTwo,
} from "./run";
import { parse } from "./parse";
import { runPart } from "../../exec";

describe("getParamterMode(s)", () => {
  test("getParameterMode works", () => {
    const input = 10102;
    expect(getParameterMode(input, 0)).toEqual(1);
    expect(getParameterMode(input, 1)).toEqual(0);
    expect(getParameterMode(input, 2)).toEqual(1);
    expect(getParameterMode(input, 3)).toEqual(0);
  });

  test("getParameterModes works", () => {
    const input = 10102;
    expect(getParameterModes(input, 3)).toEqual([1, 0, 1]);
    expect(getParameterModes(input, 4)).toEqual([1, 0, 1, 0]);
    expect(getParameterModes(input, 5)).toEqual([1, 0, 1, 0, 0]);
    expect(getParameterModes(input, 6)).toEqual([1, 0, 1, 0, 0, 0]);
  });
});

test("getValue", () => {
  const ic = [1, 2, 3];
  expect(getValue(ic, Mode.Reference, 0)).toEqual(1);
  expect(getValue(ic, Mode.Reference, 1)).toEqual(2);
  expect(getValue(ic, Mode.Reference, 2)).toEqual(3);
  expect(getValue(ic, Mode.Immediate, -5)).toEqual(-5);
  expect(getValue(ic, Mode.Immediate, 20)).toEqual(20);
});

describe("runPartOne", () => {
  test("Run `1002,4,3,4,33`", () => {
    const input = `1002,4,3,4,33`;
    const ic = parse(input);
    const result = runPartOne(ic);
    expect(result.ic[4]).toEqual(99);
  });

  test("Run `1101,100,-1,4,0`", () => {
    const input = `1101,100,-1,4,0`;
    const ic = parse(input);
    const result = runPartOne(ic);
    expect(result.ic[4]).toEqual(99);
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
