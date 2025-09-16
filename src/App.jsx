import axios from "axios";
import Weather from "./components/Weather";
import { useState, useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { DaysSkeleton } from "./skeletons/DaysSkeleton";
import { HoursSkeleton } from "./skeletons/HoursSkeleton";
import { MainWeatherSkeleton } from "./skeletons/MainWeatherSkeleton";

function App() {
  const [city, setCity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const apiKey = import.meta.env.VITE_GEOCODE_API_KEY;

  // Get user's location
  const getData = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // getCurrentPosition() is a callback-based API — it doesn't return a Promise, which means you can't await it directly. So we wrap it in a Promise manually to make it await-able.
      // You can’t avoid wrapping getCurrentPosition in a Promise if you want to use await.

      const { latitude: lat, longitude: long } = position.coords;

      const response = await axios.get(
        "https://api-bdc.net/data/reverse-geocode",
        {
          params: {
            latitude: lat,
            longitude: long,
            key: apiKey,
          },
        }
      );

      setCity(response.data.city);
    } catch (error) {
      setIsModalOpen(true);
      setErrorMessage("Couldn't access your location. Please try again");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-slate-100  bg-blue-500 ">
      <SkeletonTheme baseColor="#b1d4fa" highlightColor="#cfe5fc" duration={2}>
        <Weather
          city={city}
          setCity={setCity}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </SkeletonTheme>
    </div>
  );
}
export default App;
