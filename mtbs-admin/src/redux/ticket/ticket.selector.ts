import { createSelector } from 'reselect';
import { RootState } from '../store';

const ticket = (state: RootState) => state.ticket;

export const selectTicket = createSelector([ticket], (ticket) => ticket.ticket);

export const selectTicketList = createSelector([ticket], (ticket) => ticket.ticketList);
