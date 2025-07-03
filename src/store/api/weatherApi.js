import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTodayand15DaysLater } from "../../helpers/dateHelper";

export const weatherApi = createApi({
  reducerPath: "weatherData",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5173",
  }),
  endpoints(builder) {
    return {
      fetchWeather: builder.query({
        query: ({ lat, long }) => {
          const { start, end } = getTodayand15DaysLater();

          return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,sunset,sunrise,weather_code&hourly=temperature_2m,rain,snowfall,relative_humidity_2m&models=best_match&current=temperature_2m,is_day,rain,snowfall,wind_speed_10m,precipitation,relative_humidity_2m&timezone=auto&timeformat=unixtime&start_date=${start}&end_date=${end}`;
        },
      }),
      fetchCoords: builder.query({
        query: (city) =>
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`,
      }),
    };
  },
});

//hooks coming out of api:
export const { useFetchCoordsQuery, useFetchWeatherQuery } = weatherApi;
