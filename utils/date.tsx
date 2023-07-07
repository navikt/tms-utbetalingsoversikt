import dayjs from "dayjs";

export const formatToReadableDate = (date: string) => {
  return dayjs(date).format("D. MMMM ");
};