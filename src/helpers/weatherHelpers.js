export function getNext8Hours(hourly, sunrise, sunset) {
  /* console.log(hourly, "HOURLY"); */
  const now = Date.now(); //current time in ms
  const next8Hours = [];

  for (let i = 0; i < hourly.time.length; i++) {
    const timeStampMs = hourly.time[i] * 1000; // second * 1000 = ms

    if (timeStampMs > now) {
      const isDay =
        timeStampMs >= sunrise * 1000 && timeStampMs < sunset * 1000;

      next8Hours.push({
        date: new Date(timeStampMs),
        temp: hourly.temperature_2m[i],
        code: hourly.weather_code[i],
        isDay,
      });
    }
    if (next8Hours.length === 8) break;
  }

  return next8Hours;
}

export function getNextDays(daily) {
  /*  console.log(daily, "DAİLY"); */
  const nextDays = [];
  const now = Date.now(); //  current time in ms

  for (let i = 0; i < daily.time.length; i++) {
    const timeStampMs = daily.time[i] * 1000;
    const date = new Date(timeStampMs);
    const weekDay = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.getMonth();

    if (timeStampMs > now) {
      nextDays.push({
        weekDay,
        month,
        day: date.getDate(),
        minTemp: Math.trunc(daily.temperature_2m_min[i]),
        maxTemp: Math.trunc(daily.temperature_2m_max[i]),
        rain: daily.precipitation_probability_min[i],
        wind: Math.trunc(daily.wind_speed_10m_min[i]),
        weatherCode: daily.weather_code[i],
      });
    }
    if (nextDays.length === 5) break;
  }

  return nextDays;
}
