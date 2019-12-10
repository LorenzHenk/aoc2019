import { generatePermutations } from "./utils";

test("generate permutations works with 2", () => {
  const result = generatePermutations([0, 1]);
  expect(result).toContainEqual([0, 1]);
  expect(result).toContainEqual([1, 0]);
  expect(result.length).toBe(2);
});

test("generate permutations works with 3", () => {
  const result = generatePermutations([0, 1, 2]);
  expect(result).toContainEqual([0, 1, 2]);
  expect(result).toContainEqual([0, 2, 1]);
  expect(result).toContainEqual([1, 2, 0]);
  expect(result).toContainEqual([1, 0, 2]);
  expect(result).toContainEqual([2, 0, 1]);
  expect(result).toContainEqual([2, 1, 0]);
  expect(result.length).toBe(6);
});
