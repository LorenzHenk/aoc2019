import { DaySolver, Day } from "./types";
import { log } from "./logging";

export const runDay = async (
  day: string,
  options: { runPartOne: boolean; runPartTwo: boolean },
) => {
  log.info(`Running ${day}`);

  const theDay: Day = await import(`./days/${day}`);
  if (!theDay) {
    log.error("Day not found");
    return;
  }

  log.verbose("Gathering input");
  const { partOne, partTwo, input } = theDay;
  let { runPartOne, runPartTwo } = options;

  if (!options.runPartOne && !options.runPartTwo) {
    log.verbose("No part selected, running part one and part two.");
    runPartOne = true;
    runPartTwo = true;
  }

  if (runPartOne) {
    runPart({ part: partOne, name: "one", input });
  }
  if (runPartTwo) {
    runPart({ part: partTwo, name: "two", input });
  }
};

interface RunPartArgs {
  part?: DaySolver;
  name: string;
  input: string;
}
type RunPart = (args: RunPartArgs) => void;
export const runPart: RunPart = ({ part, name, input }) => {
  if (part) {
    log.log("info", `Running part ${name}`);
    const result = part(input);
    log.log("success", result);
  } else {
    log.warn(`Part ${name} not found`);
  }
};
