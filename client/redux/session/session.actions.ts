import { Session, SessionSeat } from "../../types/types";
import { setSession, setSessionSeats } from "./session.slice";

export function updateSession(session: Session | null) {
  return setSession(session);
};

export function updateSessionSeats(sessionSeats: SessionSeat[]) {
  return setSessionSeats(sessionSeats);
};
