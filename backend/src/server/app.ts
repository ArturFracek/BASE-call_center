import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { requestIdMiddleware } from "../middleware/requests/requestId.js";
import { httpLogger } from "../middleware/logging/httpLogger.js";
import ticketsRoutes from "../modules/tickets/routes/ticketsRoutes.js";
import {
  notFoundErrorHandler,
  badRequestErrorHandler,
  validationErrorHandler,
  fallbackErrorHandler,
} from "../middleware/errorHandlers/index.js";

const app = express();

app.use(requestIdMiddleware);
app.use(httpLogger);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketsRoutes);

app.use(notFoundErrorHandler);
app.use(badRequestErrorHandler);
app.use(validationErrorHandler);
app.use(fallbackErrorHandler);

export default app;
