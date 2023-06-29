// @ts-nocheck

const options = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  month: "short",
  day: "numeric",
  year: "numeric",
};

export const formattedDate = (date) =>
  new Date(date).toLocaleString("en-US", options);
