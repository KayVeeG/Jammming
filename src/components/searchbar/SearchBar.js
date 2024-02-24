import { React, useState } from "react";
import styles from './SearchBar.module.css';

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
    <div className={styles.searchBar}>
      <input 
        placeholder="enter a song title" 
        type="text" 
        onChange={handleInputChange}
        value={inputValue}
        className={styles.hideSelect}
        />
      <button className={styles.button} onClick={handleClick}>search</button>
    </div>
  );
}

export default SearchBar;
