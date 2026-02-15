import { useRouter } from "vue-router";
import type { ITicket } from "@/modules/tickets/types";

export const useTicketNavigation = () => {
  const router = useRouter();

  const goToDetail = (ticket: ITicket): void => {
    router.push({ name: "ticket-detail", params: { id: String(ticket.id) } });
  };

  return { goToDetail };
};
