import { useEffect, useState } from "react";
import {
  useFetchCoordsQuery,
  useFetchWeatherQuery,
} from "../store/api/weatherApi";
import { getNext6Hours, getNextDays } from "../helpers/weatherHelpers";

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
