import { useEffect, useState } from "react";
import {
  useFetchCoordsQuery,
  useFetchWeatherQuery,
} from "../store/api/weatherApi";

////////////////Helper functions////////////

function getNext6Hours(hourly) {
  const now = Date.now(); //current time in ms
  const next6Hours = [];

  console.log("NOW (ms):", now);

  for (let i = 0; i < hourly.time.length; i++) {
    const timeStampMs = hourly.time[i] * 1000; // second * 1000 = ms

    console.log("Hour:", i, "→", timeStampMs, "→", new Date(timeStampMs));

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

function getNextDays(daily) {
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
  }

  return nextDays;
}

function Weather({ city }) {
  const {
    data: coordData,
    error: errorCoord,
    isLoading: loadingCoords,
  } = useFetchCoordsQuery(city);

  const coords = coordData?.results?.[0] && {
    lat: coordData?.results[0].latitude,
    long: coordData?.results[0].longitude,
  };

  const {
    data: weatherData,
    error: errorWeather,
    isLoading: loadingWeather,
  } = useFetchWeatherQuery(coords, { skip: !coords });
  //conditionally run weather query using skip.

  if (errorCoord) return console.log("Error fetching coordinates");
  if (loadingCoords) console.log("COORDS LOADING");

  if (errorWeather) return console.log(" Error fetching weather");
  if (loadingWeather) return console.log("FETCHIN WEATHER");

  const weatherCodeMap = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Slight or moderate thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  console.log("HOURLY--", weatherData?.hourly);
  console.log("HOURLY TIME--", weatherData?.hourly.time);

  const renderedHours = weatherData?.hourly
    ? getNext6Hours(weatherData?.hourly).map((hour, i) => {
        console.log(hour);
        return (
          <li key={i}>
            <p>
              {hour.time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {<p>{hour.temp}°C</p>}
          </li>
        );
      })
    : null;

  const renderedDaily = weatherData?.daily
    ? getNextDays(weatherData.daily).map((day, i) => (
        <li key={i}>
          <p>{day.dayName}</p>
          <p>{day.day}</p>
          <p>{day.temp}°C</p>
        </li>
      ))
    : null;

  // Handling Data Error isLoading
  if (loadingCoords) console.log("COORDS LOADING");
  if (loadingWeather) return console.log("FETCHIN WEATHER");

  if (errorCoord)
    return <p>Error loading coords: {errorCoord.status || "Unknown error"}</p>;

  if (errorWeather)
    return <p>Error loading weather :{errorWeather.status || "Unknown"} </p>;

  if (weatherData) {
    return (
      <div className="parent">
        <div>
          <p>{city}</p>
          <p>Image here</p>
          {/* we conditionally render the block only when weatherData exists. this prevents rendering before state update*/}
          {weatherData && (
            <div>
              <p>{weatherData.current?.temperature_2m}°C </p>
              <p>{weatherCodeMap[weatherData.daily.weather_code[0]]}</p>
            </div>
          )}
        </div>

        <div>
          <h3>Next 6 Hours</h3>
          <ul> {renderedHours}</ul>
        </div>

        <div>
          <h3>Next Days</h3>
          <ul> {renderedDaily} </ul>
        </div>
      </div>
    );
  }
}
export default Weather;
