import { displayToast } from "@/composables/useToast";
import {
  ticketRepository,
  type UpdateStatusResponse,
} from "@/modules/tickets/repositories";
import type { TTicketStatus } from "@/modules/tickets/types";
import { getErrorMessage } from "@/shared/helpers/getErrorMessage";

export async function updateStatus(
  id: number,
  status: TTicketStatus
): Promise<UpdateStatusResponse> {
  try {
    const { data } = await ticketRepository.updateStatus(id, status);
    return data;
  } catch (err) {
    displayToast("error", getErrorMessage(err, "tickets.messages.updateError"));
    throw err;
  }
}
