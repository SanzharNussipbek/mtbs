import { format } from "date-fns";

export const getCurrentDate = () => {
  return new Date(new Date().getTime());
};

export const isToday = (datetime: number) => {
  return (
    format(new Date(datetime * 1000), "dd.MM.yyyy") ===
    format(getCurrentDate(), "dd.MM.yyyy")
  );
};

export const isTomorrow = (datetime: number) => {
  const currentDate = getCurrentDate();
  return (
    format(new Date(datetime * 1000), "dd.MM.yyyy") ===
    format(currentDate.setDate(currentDate.getDate() + 1), "dd.MM.yyyy")
  );
};

export const isInFuture = (datetime: number) => {
  return new Date(datetime * 1000).getTime() > getCurrentDate().getTime();
};

export const isInPast = (datetime: number) => {
  return new Date(datetime * 1000).getTime() < getCurrentDate().getTime();
};

export const isInOneHour = (datetime: number) => {
  const ONE_HOUR = 60 * 60 * 1000;
  const diff = Math.abs(
    getCurrentDate().getTime() -
      new Date(new Date(datetime * 1000).getTime()).getTime()
  );
  return diff < ONE_HOUR;
};
