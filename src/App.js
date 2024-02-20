import logo from "./logo.svg";
import "./App.css";

import { React, useState, useEffect } from "react";

// import components
import SearchBar from "./components/searchbar/SearchBar";
import SearchResults from "./components/searchresults/SearchResults";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([
    {
      name: "Wurst Vacation",
      artist: "Ice Nine Kills",
      album: "Horrorwood",
    },
    {
      name: "Fly me to the moon",
      artist: "Frank Sinatra",
      album: "Pretty Eyes",
    },
    {
      name: "Can you remember the rain",
      artist: "unknown",
      album: "unkown",
    },
  ]);

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

      <main>
        <SearchBar onSearch={searchHandler} />
        <ul className="songResults">
          {songs.map((song) => (
            
          ))}
        </ul>
      </main>

      <footer>
        <span>By</span>Karl von Gagern - 2024
      </footer>
    </>
  );
}

export default App;

