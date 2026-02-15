import { displayToast } from "@/composables/useToast";
import {
  ticketRepository,
  type FindByIdResponse,
} from "@/modules/tickets/repositories";
import { getErrorMessage } from "@/shared/helpers/getErrorMessage";

export async function findById(id: number): Promise<FindByIdResponse | null> {
  try {
    const { data } = await ticketRepository.findById(id);
    return data;
  } catch (err) {
    displayToast("error", getErrorMessage(err, "tickets.messages.fetchError"));
    return null;
  }
}
