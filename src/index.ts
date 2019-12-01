import program from "commander";
import dotenv from "dotenv";

dotenv.config();

import chalk from "chalk";
import { log } from "./logging";
import { runDay } from "./exec";
import init from "./init";

program.version("1.0.0");

program
  .command("init <day>")
  .description("Initialize AOC day")
  .action(async (day: string) => {
    await init(day);
  });

program
  .command("exec [day]")
  .description("Advent of Code runner")
  .option("-1, --one", "Run Part One", false)
  .option("-2, --two", "Run Part Two", false)
  .action((day: string | undefined, options) => {
    // if day is undefined, run all days with all parts
    if (day === undefined) {
      log.info("Running all days...");
      for (let i = 1; i <= 25; i++) {
        runDay(`day${i.toString().padStart(2, "0")}`, {
          runPartOne: true,
          runPartTwo: true,
        });
      }
    } else {
      // else run the selected day
      const parsedDay = parseInt(day);
      let path = day;
      if (!isNaN(parsedDay)) {
        path = `day${day.padStart(2, "0")}`;
      }

      runDay(path, { runPartOne: options.one, runPartTwo: options.two });
    }
  });

program.parse(process.argv);
