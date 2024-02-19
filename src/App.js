import logo from "./logo.svg";
import "./App.css";

import { React, useState, useEffect } from "react";

// import components
import SearchBar from "./components/searchbar/SearchBar";
import SearchResults from "./components/searchresults/SearchResults";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      console.log(searchTerm);
    }
  }, [searchTerm]);

  const searchHandler = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <>
      <nav>
        Ja<span>mmm</span>ing
      </nav>

      <SearchBar onSearch={searchHandler} />
      <SearchResults />

      <footer>
        <span>By</span>Karl von Gagern - 2024
      </footer>
    </>
  );
}

export default App;
