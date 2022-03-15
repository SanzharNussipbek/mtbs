import { createSlice } from '@reduxjs/toolkit';
import { Ticket } from "../../types/types";
import reducers from './ticket.reducer';

export interface TicketState {
  ticket: Ticket | null;
  ticketList: Ticket[];
};

export const initialState: TicketState = {
  ticket: null,
  ticketList: [],
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers,
});

export const {
  setTicket,
  setTickets,
} = ticketSlice.actions;

export default ticketSlice.reducer;
