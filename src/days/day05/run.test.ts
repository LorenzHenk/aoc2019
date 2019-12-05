import {
  getParameterMode,
  getParameterModes,
  getValue,
  Mode,
  run,
} from "./run";
import { parse } from "./parse";

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

describe("run", () => {
  test("Run `1002,4,3,4,33`", () => {
    const input = `1002,4,3,4,33`;
    const ic = parse(input);
    const result = run(ic);
    expect(result[4]).toEqual(99);
  });

  test("Run `1101,100,-1,4,0`", () => {
    const input = `1101,100,-1,4,0`;
    const ic = parse(input);
    const result = run(ic);
    expect(result[4]).toEqual(99);
  });
});
