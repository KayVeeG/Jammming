import logo from "./logo.svg";
import "./App.css";

import { React, useState, useEffect } from "react";

// import components
import SearchBar from "./components/searchbar/SearchBar";
import Song from "./components/song/Song";
import PlaylistName from "./components/playlistname/PlaylistName";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([
    {
      title: "Wurst Vacation",
      artist: "Ice Nine Kills",
      album: "Horrorwood",
    },
    {
      title: "Fly me to the moon",
      artist: "Frank Sinatra",
      album: "Pretty Eyes",
    },
    
  ]);

  const [addedSongs, setAddedSongs] = useState([
    {
      title: "Can you remember the rain",
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
        <section className="container">
          <ul className="songResults">
            <h2>Results</h2>
            {songs.map((song) => (
              <Song
                title={song.title}
                artist={song.artist}
                album={song.album}
              />
            ))}
          </ul>
          <ul className="playlist">
            <PlaylistName />
            {addedSongs.map((song) => (
              <Song
                title={song.title}
                artist={song.artist}
                album={song.album}
              />
            ))}
          </ul>
        </section>
      </main>
      <footer>
        <span>By</span>Karl von Gagern - 2024
      </footer>
    </>
  );
}

export default App;
