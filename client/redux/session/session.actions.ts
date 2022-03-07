import { Session } from "../../types/types";
import { setSession } from "./session.slice";

export function updateSession(session: Session | null) {
  return setSession(session);
};
