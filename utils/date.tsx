import dayjs from "dayjs";

const months = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const getMonth = (index: number, capitalInitalLetter: boolean): string =>
  capitalInitalLetter ? months[index] : months[index].toLowerCase();

export const formatToReadableDate = (date: string) => {
  return `${dayjs(date).date()}. ${getMonth(dayjs(date).month(), false)}`;
};

export const formatToDetailedDate = (date: string) => {
  return dayjs(date).format("DD.MM.YYYY");
};
