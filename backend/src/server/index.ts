import app from "./app.js";
import { DEFAULT_PORT, ENV_KEYS } from "../constants.js";
import logger from "../helpers/logger.js";

const PORT = parseInt(process.env[ENV_KEYS.PORT] || String(DEFAULT_PORT), 10);

app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
});
