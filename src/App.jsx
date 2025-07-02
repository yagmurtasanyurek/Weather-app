import axios from "axios";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const apiKey = import.meta.env.VITE_GEOCODE_API_KEY;

  // Get user's location
  const getData = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // getCurrentPosition() is a callback-based API — it doesn't return a Promise, which means you can't await it directly. So we wrap it in a Promise manually to make it await-able.
      // await pauses the function until the Promise is resolved.
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
      console.error("Error fetching geolocation or reverse geocoding:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <SearchBar setCity={setCity} />
      <Weather city={city} />
    </div>
  );
}
export default App;
