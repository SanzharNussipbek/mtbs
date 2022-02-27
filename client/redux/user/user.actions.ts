import { User } from "../../types/types";
import { setUser } from "./user.slice";

export function updateUser(user: User | null) {
  return setUser(user);
};

export function loginUser(user: User) {
  return setUser(user);
};

export function logoutUser() {
  return setUser(null);
};
