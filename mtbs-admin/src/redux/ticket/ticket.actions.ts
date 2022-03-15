import { Ticket } from "../../types/types";
import { setTicket, setTickets } from "./ticket.slice";

export function updateTicket(ticket: Ticket | null) {
  return setTicket(ticket);
};

export function setTicketList(tickets: Ticket[]) {
  return setTickets(tickets);
};
