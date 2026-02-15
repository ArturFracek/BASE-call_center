export { TICKETS_BASE } from "./base";
export {
  findCounts,
  findCountsPath,
  type ICountsByStatus,
} from "./findCounts";
export {
  findAll,
  findAllPath,
  type IFindAllResponse,
} from "./findAll";
export {
  findById,
  findByIdPath,
  type TFindByIdResponse,
} from "./findById";
export {
  updateStatus,
  updateStatusPath,
  type TUpdateStatusResponse,
} from "./updateStatus";

import { findCounts } from "./findCounts";
import { findAll } from "./findAll";
import { findById } from "./findById";
import { updateStatus } from "./updateStatus";

export const ticketRepository = {
  findCounts,
  findAll,
  findById,
  updateStatus,
};
