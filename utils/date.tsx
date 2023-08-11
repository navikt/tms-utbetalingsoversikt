import dayjs from "dayjs";

export const formatToReadableDate = (date: string) => {
  return dayjs(date).format("D. MMMM ");
};

export const formatToDetailedDate = (date: string) => {
  return dayjs(date).format("DD.MM.YYYY");
};