import { displayToast } from "@/composables/useToast";
import {
  ticketRepository,
  type FindAllResponse,
} from "@/modules/tickets/repositories";
import type { TFindAllTicketsParams } from "@/modules/tickets/types";
import { getErrorMessage } from "@/shared/helpers/getErrorMessage";

export const findAll = async (
  params?: TFindAllTicketsParams
): Promise<FindAllResponse> => {
  try {
    const { data: response } = await ticketRepository.findAll(params);
    return response;
  } catch (err) {
    displayToast("error", getErrorMessage(err, "tickets.messages.fetchError"));
    throw err;
  }
};
