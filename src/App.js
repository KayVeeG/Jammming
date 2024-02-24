import logo from "./logo.svg";
import "./App.css";

import { React, useState, useEffect } from "react";

// import components
import SearchBar from "./components/searchbar/SearchBar";
import Song from "./components/song/Song";
import PlaylistName from "./components/playlistname/PlaylistName";
import SaveButton from "./components/savebutton/SaveButton";

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

  const addHandler = (songToAdd) => { 
    setAddedSongs((prevAddedSongs) => {
      return [...prevAddedSongs, songToAdd]; //add prev array + new song
    });
  };

  const removeHandler = (songToRemove) => { //only pass all thoughts to list, which dont have the name of the song to remove
    setSongs(songs.filter((song) => song !== songToRemove.title));
  };

  const switchHandler = (songToSwitch) => {
    console.log('switching song...');

    // is true if songToSwitch title matches a song title in resultList
    const isInResults = songs.some((song) => song.title === songToSwitch.title);

    // detect in what list the song was triggered
    if (isInResults) { //if song is in resultlist
      console.log('switching song from result list to playlist list...');
      setAddedSongs((prevAddedSongs) => { //add song to playlist list
        return [...prevAddedSongs, songToSwitch]; //add prev array + new song
      });
      setSongs(songs.filter((song) => song.title !== songToSwitch.title)); //remove song from result list
    } else { //if song is in playlist list
      console.log("switching song from playlist list to result list...");
      setSongs(songs)
    }
  }

  return (
    <>
      {/* header */}
      <nav>
        Ja<span>mmm</span>ing
      </nav>

      <main> 
        {/* searchbar */}
        <SearchBar onSearch={searchHandler} />


        {/* songlists */}
        <section className="container">
          <ul className="songResults">
            <h2>Results</h2>
            {songs.map((song) => (
              <Song song={song} onAdd={addHandler} onRemove={removeHandler} onSwitch={switchHandler}/>
            ))}
          </ul>
          <ul className="playlist">
            <PlaylistName />
            {addedSongs.map((song) => (
              <Song song={song} onAdd={addHandler} onRemove={removeHandler} onSwitch={switchHandler}/>
            ))}
            <SaveButton />
          </ul>
        </section>

      </main>

      {/*footer*/}
      <footer>
        <span>By</span>Karl von Gagern - 2024
      </footer>
    </>
  );
}

export default App;
