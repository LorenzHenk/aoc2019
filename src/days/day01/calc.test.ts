import { calculateFuel, calculateFuelWithFuel } from "./calc";

describe("calculateFuel", () => {
  test("correct results", () => {
    expect(calculateFuel(12)).toBe(2);
    expect(calculateFuel(14)).toBe(2);
    expect(calculateFuel(1969)).toBe(654);
    expect(calculateFuel(100756)).toBe(33583);
  });
});

describe("calculateFuelWithFuel", () => {
  test("correct results", () => {
    expect(calculateFuelWithFuel(14)).toBe(2);
    expect(calculateFuelWithFuel(1969)).toBe(966);
    expect(calculateFuelWithFuel(100756)).toBe(50346);
  });
});
