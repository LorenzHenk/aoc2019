import { createObjectMap, Identifier } from "./spaceObjects";

const getPath = (
  map: ReturnType<typeof createObjectMap>,
  key: Identifier,
): Identifier[] => {
  const result: Identifier[] = [key];
  let currentObject = map[key];
  while (currentObject.orbitsAroundIdentifier !== undefined) {
    result.push(currentObject.orbitsAroundIdentifier);
    currentObject = map[currentObject.orbitsAroundIdentifier];
  }
  return result;
};

export const calculateDistance = (
  map: ReturnType<typeof createObjectMap>,
  key: Identifier,
): number => getPath(map, key).length - 1;

export const calculateDistanceBetween = (
  map: ReturnType<typeof createObjectMap>,
  key1: Identifier,
  key2: Identifier,
): number => {
  const path1 = getPath(map, key1);
  const path2 = getPath(map, key2);

  let i = 0;
  while (path1[path1.length - i - 1] === path2[path2.length - i - 1]) {
    i++;
  }

  return path1.length - i + path2.length - i;
};

export const calculateTotalDistance = (
  map: ReturnType<typeof createObjectMap>,
) => {
  const distanceCache: Record<Identifier, number> = {};
  const result = Object.keys(map).reduce((p, c) => {
    if (!distanceCache[c]) {
      distanceCache[c] = calculateDistance(map, c);
    }
    return p + distanceCache[c];
  }, 0);
  return result;
};
