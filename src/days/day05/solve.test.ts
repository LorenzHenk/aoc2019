import { parse } from "./parse";
import { runPartOne } from "./run";

describe("The small parts", () => {
  test("`1,0,0,0,99` becomes `**2**,0,0,0,99` (`1 + 1 = 2`)", () => {
    const input = `1,0,0,0,99`;
    const output = `2,0,0,0,99`;
    expect(runPartOne(parse(input)).ic.join(",")).toEqual(output);
  });
  test("`2,3,0,3,99` becomes `2,3,0,**6**,99` (`3 * 2 = 6`)", () => {
    const input = `2,3,0,3,99`;
    const output = `2,3,0,6,99`;
    expect(runPartOne(parse(input)).ic.join(",")).toEqual(output);
  });
  test("`2,4,4,5,99,0` becomes `2,4,4,5,99,**9801**` (`99 * 99 = 9801`)", () => {
    const input = `2,4,4,5,99,0`;
    const output = `2,4,4,5,99,9801`;
    expect(runPartOne(parse(input)).ic.join(",")).toEqual(output);
  });
  test("`1,1,1,4,99,5,6,0,99` becomes `**30**,1,1,4,**2**,5,6,0,99` (`1 + 1 = 2`)", () => {
    const input = `1,1,1,4,99,5,6,0,99`;
    const output = `30,1,1,4,2,5,6,0,99`;
    expect(runPartOne(parse(input)).ic.join(",")).toEqual(output);
  });
});
