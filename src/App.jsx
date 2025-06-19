import axios from "axios";
import { useEffect } from "react";

import SearchBar from "./components/SearchBar";
import { useState } from "react";

function App() {
  const getData = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude: lat, longitude: long } = position.coords;

      const response = await axios.get(
        "https://api-bdc.net/data/reverse-geocode",
        {
          params: {
            latitude: lat,
            longitude: long,
            key: "bdc_4dc7684a774941f493463004ab369404",
          },
        }
      );
    } catch (error) {
      console.error("Error fetching geolocation or reverse geocoding:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [city, setCity] = useState("");

  return (
    <div>
      <SearchBar setCity={setCity} />
    </div>
  );
}
export default App;
