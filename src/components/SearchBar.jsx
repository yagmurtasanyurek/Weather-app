import { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
    setInput("");
  };
  return (
    <form className=" border bg-white rounded-xl" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={input}
        type="search"
        aria-label="Search for a city"
        inputMode="search"
        placeholder=" Search a city"
        className=" text-black outline-none rounded-xl h-8 "
      />
    </form>
  );
}

export default SearchBar;
