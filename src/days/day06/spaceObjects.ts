import { parse } from "./parse";

export type Identifier = string;

export interface SpaceObject {
  identifier: Identifier;
  orbitsAroundIdentifier?: Identifier;
}

export const createObjectMap = (
  objects: ReturnType<typeof parse>,
): Record<Identifier, SpaceObject> => {
  const result: ReturnType<typeof createObjectMap> = {};

  objects.forEach(o => {
    result[o.identifier] = o;
    if (result[o.orbitsAroundIdentifier] === undefined) {
      result[o.orbitsAroundIdentifier] = {
        identifier: o.orbitsAroundIdentifier,
      };
    }
  });

  return result;
};
