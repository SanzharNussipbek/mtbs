import { PayloadAction } from '@reduxjs/toolkit';
import { Ticket } from '../../types/types';
import { TicketState } from './ticket.slice';

const reducers = {
  setTicket: (state: TicketState, action: PayloadAction<Ticket | null>) => {
    state.ticket = action.payload;
    return state;
  },
  setTickets: (state: TicketState, action: PayloadAction<Ticket[]>) => {
    state.ticketList = action.payload;
    return state;
  },
};

export default reducers;
