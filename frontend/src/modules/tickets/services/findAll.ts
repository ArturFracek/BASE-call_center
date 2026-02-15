import { displayToast } from "@/composables/useToast";
import {
  ticketRepository,
  type IFindAllResponse,
} from "@/modules/tickets/repositories";
import type { IFindAllTicketsParams } from "@/modules/tickets/types";
import { getErrorMessage } from "@/shared/helpers/getErrorMessage";

export const findAll = async (
  params?: IFindAllTicketsParams
): Promise<IFindAllResponse> => {
  try {
    const { data: response } = await ticketRepository.findAll(params);
    return response;
  } catch (err) {
    displayToast("error", getErrorMessage(err, "tickets.messages.fetchError"));
    throw err;
  }
};
