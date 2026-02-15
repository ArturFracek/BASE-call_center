export { TICKETS_BASE } from "./base";
export {
  findCounts,
  findCountsPath,
  type TCountsByStatus,
} from "./findCounts";
export {
  findAll,
  findAllPath,
  type FindAllResponse,
} from "./findAll";
export {
  findById,
  findByIdPath,
  type FindByIdResponse,
} from "./findById";
export {
  updateStatus,
  updateStatusPath,
  type UpdateStatusResponse,
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
