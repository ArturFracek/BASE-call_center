import { displayToast } from "@/composables/useToast";
import {
  ticketRepository,
  type TUpdateStatusResponse,
} from "@/modules/tickets/repositories";
import type { TTicketStatus } from "@/modules/tickets/types";
import { getErrorMessage } from "@/shared/helpers/getErrorMessage";

export const updateStatus = async (
  id: number,
  status: TTicketStatus
): Promise<TUpdateStatusResponse> => {
  try {
    const { data } = await ticketRepository.updateStatus(id, status);
    return data;
  } catch (err) {
    displayToast("error", getErrorMessage(err, "tickets.messages.updateError"));
    throw err;
  }
};
