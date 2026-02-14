import type { NextFunction, Request, Response } from "express";
import logger from "../../helpers/logger.js";

export function httpLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const startTime = performance.now();

  const onEnd = (): void => {
    res.removeListener("finish", onEnd);
    res.removeListener("close", onEnd);

    const responseTime = Math.round(performance.now() - startTime) + "ms";
    const status = res.statusCode;
    const method = req.method;
    const url = req.originalUrl;
    const requestId = req.requestId;

    const logData = {
      ...(requestId && { requestId }),
      method,
      url,
      status,
      responseTime,
    };

    if (status >= 500) {
      logger.error(logData, "HTTP Request");
    } else if (status >= 400) {
      logger.warn(logData, "HTTP Request");
    } else {
      logger.info(logData, "HTTP Request");
    }
  };

  res.on("finish", onEnd);
  res.on("close", onEnd);

  next();
}
