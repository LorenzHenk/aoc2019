import { addColors, createLogger, transports, format } from "winston";

const customLoggingLevels = {
  levels: {
    error: 0,
    warn: 1,
    success: 2,
    info: 3,
    verbose: 4,
  },
  colors: {
    error: "red",
    warn: "yellow",
    success: "bold green",
    info: "white",
    verbose: "dim white",
  },
};

addColors(customLoggingLevels.colors);

const formatter = format.printf(
  ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`,
);

export const log = createLogger({
  levels: customLoggingLevels.levels,
  transports: [new transports.Console()],
  format: format.combine(format.colorize(), format.timestamp(), formatter),
});
