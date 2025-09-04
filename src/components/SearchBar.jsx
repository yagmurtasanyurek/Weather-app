import { useState, useEffect } from "react";
import { useFetchCoordsQuery } from "../store/api/weatherApi";

function SearchBar({ onSearch, setCity }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { data } = useFetchCoordsQuery(input);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (!value) setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
    setInput("");
  };

  const handleClick = (city) => {
    setCity(city.name);
    setSuggestions([]);
    setInput("");
  };

  useEffect(() => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    if (data?.results) {
      setSuggestions(data.results.slice(0, 3));
    }
  }, [input, data]);

  const renderedSuggestions = suggestions?.map((city, i) => {
    return (
      <li key={i} onClick={() => handleClick(city)}>
        <div className="  cursor-pointer hover:bg-sky-400 bg-neutral-50 ">
          <p className="pl-5 p-2 text-indigo-950"> {city.name}</p>
        </div>
      </li>
    );
  });

  return (
    <div className="relative">
      <form
        className="border rounded-md  w-40 sm:w-64 md:w-80 pl-3 pt-1 pb-1 bg-neutral-50"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChange}
          value={input}
          type="search"
          aria-label="Search for a city"
          inputMode="search"
          placeholder=" Search a city"
          className=" text-black outline-none rounded-xl w-full h-8 pr-2 bg-neutral-50 "
        />
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute top-12 left-0 w-40 sm:w-64 md:w-80 rounded-md overflow-hidden ">
          {renderedSuggestions}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
