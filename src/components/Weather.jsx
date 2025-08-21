import {
  useFetchCoordsQuery,
  useFetchWeatherQuery,
} from "../store/api/weatherApi";
import { getNext8Hours, getNextDays } from "../helpers/weatherHelpers";
import { weatherCodeMap } from "../helpers/weatherCodeMap";
import weatherIconMap from "../helpers/weatherIconMap";
import { toFormData } from "axios";
import { getHour, isNowDaytime } from "../helpers/dateHelper";
import SearchBar from "./SearchBar";
import { getTodaysDate } from "../helpers/dateHelper";
import { useState, useEffect } from "react";
import { formatCityName } from "../helpers/formatCityName.js";

function Weather({ city, setCity }) {
  const [pendingCity, setPendingCity] = useState("");
  const [coords, setCoords] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (name) => {
    if (!name) return;
    setErrorMessage("");
    setPendingCity(name);
  };

  const {
    data: coordData,
    currentData: currentCoords,
    isFetching: fetchingCoords,
    isLoading: loadingCoords,
    isError: errorCoord,
  } = useFetchCoordsQuery(pendingCity, { skip: !pendingCity });
  /* don’t run the query if pendingCity is empty, null, or undefined. */

  const hasValidCurrentCoords = !!currentCoords?.results?.length;
  /* !! cast any value to a strict true or false */

  useEffect(() => {
    if (!city) return;

    setPendingCity(city);
    //useFetchCoordsQuery hook knows when to run and fetch new coordinates.
  }, [city]);

  useEffect(() => {
    if (!pendingCity || fetchingCoords) return; // no search yet

    if (hasValidCurrentCoords) {
      const first = currentCoords.results[0];
      setCoords({ lat: first.latitude, long: first.longitude });
      setCity(formatCityName(pendingCity));
      setErrorMessage("");
    } else {
      setErrorMessage("City not found. Please try again.");
    }
  }, [
    pendingCity,
    fetchingCoords,
    hasValidCurrentCoords,
    currentCoords,
    setCity,
  ]);

  const {
    data: weatherData,
    isLoading: loadingWeather,
    isFetching: fetchingWeather,
    isError: errorWeather,
  } = useFetchWeatherQuery(coords, { skip: !coords });

  const renderedHours = weatherData?.hourly
    ? getNext8Hours(
        weatherData?.hourly,
        weatherData?.daily.sunrise[0],
        weatherData?.daily.sunset[0]
      ).map((hour, i) => {
        return (
          <li key={i}>
            <div className=" flex flex-col justify-center items-center min-w-[100px] h-[130px]  bg-white/10 rounded-xl p-2 ">
              <p>
                {hour.date.toLocaleTimeString([], {
                  hour: "2-digit",
                })}
              </p>
              <img
                src={
                  hour.isDay
                    ? weatherIconMap[hour.code]?.day
                    : weatherIconMap[hour.code]?.night
                }
              />
              <p>{Math.trunc(hour.temp)}°C</p>
            </div>
          </li>
        );
      })
    : null;

  const renderedDaily = weatherData?.daily
    ? getNextDays(weatherData?.daily).map((day, i) => (
        <li
          className="flex justify-around items-center border border-solid bg-white/10 rounded-xl border-transparent py-2"
          key={i}
        >
          <div className="flex flex-col  w-9">
            <p className="font-medium">{day.weekDay}</p>
            <p className="font-light">
              {day.day}/{day.month}
            </p>
          </div>

          <div>
            <img src={weatherIconMap[day.weatherCode].day} />
          </div>
          <div className="min-w-9">
            <p className="font-medium">{day.minTemp}°C</p>
            <p className="font-light">Low</p>
          </div>
          <div className="min-w-9">
            <p className="font-medium">{day.maxTemp}°C</p>
            <p className="font-light">High</p>
          </div>

          <div className="min-w-9">
            <p className="font-medium">{day.wind} km/h</p>
            <p className="font-light">Wind</p>
          </div>
          <div className="-minw-9">
            <p className="font-medium">
              {day.rain}
              <span>&#x25;</span>
            </p>
            <p className="font-light">Rain</p>
          </div>
        </li>
      ))
    : null;

  const currentCode = weatherData?.daily.weather_code[0];
  const sunrise = weatherData?.daily.sunrise[0];
  const sunset = weatherData?.daily.sunset[0];
  const isDay = isNowDaytime(sunrise, sunset);

  const currentIcon = isDay
    ? weatherIconMap[currentCode]?.day
    : weatherIconMap[currentCode]?.night;

  return (
    <div className=" flex-1 max-w-5xl w-full mx-auto bg-blue-500 px-6 py-10 sm:py-10 sm:px-10">
      <div className="flex justify-between items-center mb-9 px-6 sm:px-0">
        {/* lOCATİON AND DATE*/}
        <div>
          {city && <p className="font-bold pl-5 text-2xl">{city}</p>}
          {city && <p className="pl-5">{getTodaysDate()}</p>}
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {pendingCity && fetchingCoords && <p>Validating city...</p>}
      {errorCoord && <p className="text-red-500">Error validating city.</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {coords && fetchingWeather && <p>Fetching weather...</p>}
      {errorWeather && <p className="text-red-500">Error loading weather.</p>}

      {weatherData && (
        <>
          {/* PARENT DİV with 2 children */}
          <div className="flex flex-col sm:flex-row  justify-between  gap-y-10 items-center  mb-20">
            {/* Current temperature */}
            <div className="flex items-center shrink-0">
              <img
                src={currentIcon}
                alt="weather icon"
                className="w-48 h-48 md:w-64 md:h-64"
              />
              <div className="">
                <div>
                  <p className="font-medium text-7xl">
                    {weatherData.current?.temperature_2m}°
                  </p>
                  <p>{weatherCodeMap[weatherData.daily.weather_code[0]]}</p>
                </div>
              </div>
            </div>
            {/* Current stats div */}
            <div className="grid grid-cols-3 grid-rows-2 gap-7 px-4 md:px-10 text-xl sm:text-base max-w-md text-center">
              <div>
                <p className="font-medium">
                  {Math.trunc(weatherData.daily.temperature_2m_max[0])}
                </p>
                <p className="font-light">High </p>
              </div>
              <div>
                <p className="font-medium"> {weatherData.current.rain}</p>
                <p className="font-light">Rain</p>
              </div>
              <div>
                <p className="font-medium">
                  {getHour(weatherData.daily.sunrise[0] * 1000)}
                </p>
                <p className="font-light">Sunrise</p>
              </div>
              <div>
                <p className="font-medium">
                  {Math.trunc(weatherData.daily.temperature_2m_min[0])}
                </p>
                <p className="font-light">Low</p>
              </div>
              <div>
                <p className="font-medium">
                  {Math.trunc(weatherData.current.wind_speed_10m)}
                </p>
                <p className="font-light">Wind</p>
              </div>
              <div>
                <p className="font-medium">
                  {getHour(weatherData.daily.sunset[0] * 1000)}
                </p>
                <p className="font-light">Sunset</p>
              </div>
            </div>
          </div>

          {/* Weather by Hour */}
          <div className="mb-24  px-6 sm:px-0 ">
            <p className="font-medium mb-4">Next 8 Hours</p>
            <ul className="flex gap-4 justify-around overflow-x-auto ">
              {renderedHours}
            </ul>
          </div>

          {/* Weather by Days */}
          <div className="mb-5  px-6 sm:px-0">
            <h3 className="font-medium mb-4">Next Days</h3>
            <ul className="flex flex-col gap-2 justify-start">
              {renderedDaily}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
