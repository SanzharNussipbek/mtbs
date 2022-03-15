import { Session, SessionSeat } from "../../types/types";
import { setSession, setSessionSeats, setSessionList } from "./session.slice";

export function updateSession(session: Session | null) {
  return setSession(session);
};

export function updateSessionList(sessionList: Session[]) {
  return setSessionList(sessionList);
};

export function updateSessionSeats(sessionSeats: SessionSeat[]) {
  return setSessionSeats(sessionSeats);
};
