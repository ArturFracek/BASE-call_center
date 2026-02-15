import { ticketRepository } from "@/modules/tickets/repositories";

export const findCounts = async () => {
  const { data } = await ticketRepository.findCounts();
  return data;
};
