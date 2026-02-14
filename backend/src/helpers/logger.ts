import pino from "pino";

const level = process.env.LOG_LEVEL ?? "info";
const isDev = process.env.NODE_ENV !== "production";

const options: pino.LoggerOptions = {
  level,
};

if (isDev) {
  options.transport = {
    target: "pino-pretty",
    options: { colorize: true },
  };
}

const logger = pino(options);

export default logger;
