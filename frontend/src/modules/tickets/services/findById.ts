import { displayToast } from "@/composables/useToast";
import {
  ticketRepository,
  type TFindByIdResponse,
} from "@/modules/tickets/repositories";
import { getErrorMessage } from "@/shared/helpers/getErrorMessage";

export const findById = async (
  id: number
): Promise<TFindByIdResponse | null> => {
  try {
    const { data } = await ticketRepository.findById(id);
    return data;
  } catch (err) {
    displayToast("error", getErrorMessage(err, "tickets.messages.fetchError"));
    return null;
  }
};
