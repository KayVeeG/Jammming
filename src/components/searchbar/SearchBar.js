import { React, useState } from "react";

function SearchBar({ onSearch }) {

    const [inputValue, setInputValue] = useState(""); // Local state to store the input value

    const handleInputChange = (event) => {
        setInputValue(event.target.value) // Update the local state with the input value
    };

    const handleClick = () => {
        onSearch(inputValue); // pass current value to parent component
        setInputValue('');
    }

  return (
    <div className="searchBar">
      <input 
        placeholder="enter a string, artist or whatevs" 
        type="text" 
        onChange={handleInputChange}
        value={inputValue}
        />
      <button onClick={handleClick}>search</button>
    </div>
  );
}

export default SearchBar;
