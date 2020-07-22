const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (datetime) => {
  const date = new Date(datetime);
  const monthIndex = date.getMonth();
  const dateNumber = date.getDate();
  const year = date.getFullYear();
  const monthName = shortMonthNames[monthIndex];

  return `${monthName} ${dateNumber}, ${year}`;
};
