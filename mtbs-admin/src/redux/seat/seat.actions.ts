import { Seat } from "../../types/types";
import { setSeat, setSeats } from "./seat.slice";

export function updateSeat(seat: Seat | null) {
  return setSeat(seat);
};

export function setSeatList(seats: Seat[]) {
  return setSeats(seats);
};
