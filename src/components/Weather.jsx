import {
  useFetchCoordsQuery,
  useFetchWeatherQuery,
} from "../store/api/weatherApi";
import { getNext6Hours, getNextDays } from "../helpers/weatherHelpers";
import { weatherCodeMap } from "../helpers/weatherCodeMap";
import { toFormData } from "axios";

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

  const renderedHours = weatherData?.hourly
    ? getNext6Hours(weatherData?.hourly).map((hour, i) => {
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
