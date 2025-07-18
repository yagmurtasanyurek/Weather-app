import {
  useFetchCoordsQuery,
  useFetchWeatherQuery,
} from "../store/api/weatherApi";
import { getNext6Hours, getNextDays } from "../helpers/weatherHelpers";
import { weatherCodeMap } from "../helpers/weatherCodeMap";
import { toFormData } from "axios";
import { getHour } from "../helpers/dateHelper";

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

  console.log(weatherData);

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
          <p>{day.weekDay}</p>
          <p> {day.day}</p>
          <p> Min Temp{day.minTemp}°C</p>
          <p>Max Temp{day.maxTemp}°C</p>
          <p>Wind {day.wind}</p>
          <p>Rain {day.rain}</p>
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
            <p>High {weatherData.daily.temperature_2m_max[0]}</p>
            <p>Low {weatherData.daily.temperature_2m_min[0]}</p>
            <p>Rain {weatherData.current.rain}</p>
            <p>Wind {weatherData.current.wind_speed_10m}</p>
            <p>Humidity {weatherData.current.rain}</p>
            <p>Sunrise {getHour(weatherData.daily.sunrise[0] * 1000)}</p>
            <p>Sunset {getHour(weatherData.daily.sunset[0] * 1000)}</p>
          </div>
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
