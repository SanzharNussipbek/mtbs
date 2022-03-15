import { Hall } from "../../types/types";
import { setHall, setHalls } from "./hall.slice";

export function updateHall(hall: Hall | null) {
  return setHall(hall);
};

export function setHallList(halls: Hall[]) {
  return setHalls(halls);
};
