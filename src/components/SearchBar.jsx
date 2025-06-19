import { useState } from "react";
function SearchBar({ setCity }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    setCity(input);
    setInput("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={input} type="text" />
    </form>
  );
}

export default SearchBar;
