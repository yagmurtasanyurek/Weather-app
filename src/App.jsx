import SearchBar from "./components/SearchBar";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");

  return (
    <div>
      <SearchBar setCity={setCity} />
    </div>
  );
}
export default App;
