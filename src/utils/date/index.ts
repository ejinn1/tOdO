export const getWeekDays = (date: Date) => {
  const startOfWeek = new Date(date);
  const weekDays = Array.from({ length: 14 }).map((_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });
  return weekDays;
};
