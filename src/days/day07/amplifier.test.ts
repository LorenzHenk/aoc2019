import { Amplifier } from "./amplifier";

describe("Full test", () => {
  test("Example 01", () => {
    const code = [1, 0, 0, 0, 99];
    const output = [2, 0, 0, 0, 99];
    const amplifier = new Amplifier(code, 1);
    amplifier.run();
    expect(amplifier.code).toEqual(output);
  });
  test("Example 02", () => {
    const code = [2, 3, 0, 3, 99];
    const output = [2, 3, 0, 6, 99];
    const amplifier = new Amplifier(code, 1);
    amplifier.run();
    expect(amplifier.code).toEqual(output);
  });
  test("Example 03", () => {
    const code = [2, 4, 4, 5, 99, 0];
    const output = [2, 4, 4, 5, 99, 9801];
    const amplifier = new Amplifier(code, 1);
    amplifier.run();
    expect(amplifier.code).toEqual(output);
  });
  test("Example 04", () => {
    const code = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    const output = [30, 1, 1, 4, 2, 5, 6, 0, 99];
    const amplifier = new Amplifier(code, 1);
    amplifier.run();
    expect(amplifier.code).toEqual(output);
  });
  test("Example 05", () => {
    const code = [1002, 4, 3, 4, 33];
    const amplifier = new Amplifier(code, 1);
    amplifier.run();
    expect(amplifier.code[4]).toEqual(99);
  });
  test("Example 06", () => {
    const code = [1101, 100, -1, 4, 0];
    const amplifier = new Amplifier(code, 1);
    amplifier.run();
    expect(amplifier.code[4]).toEqual(99);
  });
  test("Example 07", () => {
    const code = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
    const amplifier = new Amplifier(code, 8);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(1);
  });
  test("Example 08", () => {
    const code = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
    const amplifier = new Amplifier(code, 10);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(0);
  });
  test("Example 09", () => {
    const code = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
    const amplifier = new Amplifier(code, 7);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(1);
  });
  test("Example 10", () => {
    const code = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
    const amplifier = new Amplifier(code, 8);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(0);
  });
  test("Example 11", () => {
    const code = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
    const amplifier = new Amplifier(code, 8);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(1);
  });
  test("Example 12", () => {
    const code = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
    const amplifier = new Amplifier(code, 10);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(0);
  });
  test("Example 13", () => {
    const code = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
    const amplifier = new Amplifier(code, 7);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(1);
  });
  test("Example 14", () => {
    const code = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
    const amplifier = new Amplifier(code, 8);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(0);
  });
  test("Example 15", () => {
    const code = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
    const amplifier = new Amplifier(code, 1);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(1);
  });
  test("Example 16", () => {
    const code = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
    const amplifier = new Amplifier(code, 0);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(0);
  });
  test("Example 17", () => {
    const code = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
    const amplifier = new Amplifier(code, 1);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(1);
  });
  test("Example 18", () => {
    const code = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
    const amplifier = new Amplifier(code, 0);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(0);
  });
  test("Example 19", () => {
    const code = [
      3,
      21,
      1008,
      21,
      8,
      20,
      1005,
      20,
      22,
      107,
      8,
      21,
      20,
      1006,
      20,
      31,
      1106,
      0,
      36,
      98,
      0,
      0,
      1002,
      21,
      125,
      20,
      4,
      20,
      1105,
      1,
      46,
      104,
      999,
      1105,
      1,
      46,
      1101,
      1000,
      1,
      20,
      4,
      20,
      1105,
      1,
      46,
      98,
      99,
    ];
    let amplifier = new Amplifier(code, 6);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(999);
    amplifier = new Amplifier(code, 8);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(1000);
    amplifier = new Amplifier(code, 10);
    amplifier.run();
    expect(amplifier.LastOutput).toEqual(1001);
  });
});
