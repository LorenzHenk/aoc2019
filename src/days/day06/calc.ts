import { createObjectMap, Identifier } from "./spaceObjects";

export const calculateDistance = (
  map: ReturnType<typeof createObjectMap>,
  key: Identifier,
): number => {
  let distance = 0;
  let currentObject = map[key];
  while (currentObject.orbitsAroundIdentifier !== undefined) {
    currentObject = map[currentObject.orbitsAroundIdentifier];
    distance++;
  }
  return distance;
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
