import { format } from "date-fns";

export const getCurrentDate = () => {
  const offset = +8;
  return new Date(new Date().getTime());
};

export const isToday = (datetime: number) => {
  return (
    format(new Date(datetime * 1000), "dd.MM.yyyy") ===
    format(getCurrentDate(), "dd.MM.yyyy")
  );
};

export const isTomorrow = (datetime: number) => {
  return (
    format(new Date(datetime * 1000), "dd.MM.yyyy") ===
    format(
      getCurrentDate().setDate(getCurrentDate().getDate() + 1),
      "dd.MM.yyyy"
    )
  );
};

export const isInFuture = (datetime: number) => {
  return new Date(datetime * 1000).getTime() > getCurrentDate().getTime();
};

export const isInPast = (datetime: number) => {
  return new Date(datetime * 1000).getTime() < getCurrentDate().getTime();
};
