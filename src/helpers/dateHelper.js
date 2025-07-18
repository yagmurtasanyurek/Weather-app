export function getTodayand15DaysLater() {
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 15);

  const format = (date) => date.toISOString().slice(0, 10);

  return {
    start: format(today),
    end: format(endDate),
  };
}

export function getHour(timestamp) {
  const date = new Date(timestamp);
  const time = date.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
}
