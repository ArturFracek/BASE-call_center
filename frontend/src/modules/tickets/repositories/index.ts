export { TICKETS_BASE } from "./base";
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

import { findAll } from "./findAll";
import { findById } from "./findById";
import { updateStatus } from "./updateStatus";

export const ticketRepository = {
  findAll,
  findById,
  updateStatus,
};
