import { SpaceObject } from "./spaceObjects";

export const parse = (input: string) =>
  input.split("\n").map(l => {
    const [orbitsAroundIdentifier, identifier] = l.split(")");
    return { identifier, orbitsAroundIdentifier } as Required<SpaceObject>;
  });
