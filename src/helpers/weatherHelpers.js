export function getNext6Hours(hourly) {
  const now = Date.now(); //current time in ms
  const next6Hours = [];

  for (let i = 0; i < hourly.time.length; i++) {
    const timeStampMs = hourly.time[i] * 1000; // second * 1000 = ms

    if (timeStampMs > now) {
      next6Hours.push({
        time: new Date(timeStampMs),
        temp: hourly.temperature_2m[i],
      });
    }
    if (next6Hours.length === 6) break;
  }

  return next6Hours;
}

export function getNextDays(daily) {
  const nextDays = [];
  const now = Date.now(); //  current time in ms

  for (let i = 0; i < daily.time.length; i++) {
    const timeStampMs = daily.time[i] * 1000;
    const date = new Date(timeStampMs);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate();

    if (timeStampMs > now) {
      nextDays.push({
        dayName,
        day,
        temp: daily.temperature_2m_min[i],
      });
    }
    if (nextDays.length === 7) break;
  }

  return nextDays;
}
