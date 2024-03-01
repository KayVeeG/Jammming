import logo from "./logo.svg";
import "./App.css";

import { React, useState, useEffect } from "react";

// import components
import SearchBar from "./components/searchbar/SearchBar";
import Song from "./components/song/Song";
import PlaylistName from "./components/playlistname/PlaylistName";
import SaveButton from "./components/savebutton/SaveButton";
import ApiHandler from "./components/apihandler/ApiHandler";

function App() {
  // test for .env flow to work
  // console.log(process.env.REACT_APP_CLIENT_ID);
  // console.log(process.env.REACT_APP_CLIENT_SECRET);

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
    {
      title: "Can you remember the rain",
      artist: "unknown",
      album: "unkown",
    },
  ]);

  const [addedSongs, setAddedSongs] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      console.log(searchTerm);
    }
  }, [searchTerm]);

  const searchHandler = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const switchHandler = (songToSwitch) => {
    console.log("switching song...");

    // is true if songToSwitch title matches a song title in resultList
    const isInResults = songs.some((song) => song.title === songToSwitch.title);

    // detect in what list the song was triggered
    if (isInResults) {
      //if song is in resultlist

      console.log("switching song from result list to playlist list...");
      setAddedSongs((prevAddedSongs) => {
        //add song to playlist list
        return [...prevAddedSongs, songToSwitch]; //add prev array + new song
      });
      setSongs(songs.filter((song) => song.title !== songToSwitch.title)); //remove song from result list
    } else {
      //if song is in playlist list

      console.log("switching song from playlist list to result list...");
      setSongs((prevSongs) => {
        return [...prevSongs, songToSwitch];
      });
      setAddedSongs(
        addedSongs.filter((song) => song.title !== songToSwitch.title)
      );
    }
  };

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
              <Song key={song.title} song={song} onSwitch={switchHandler} isAdded={false} />
            ))}
          </ul>
          <ul className="playlist">
            <PlaylistName />
            {addedSongs.map((song) => (
              <Song key={song.title} song={song} onSwitch={switchHandler} isAdded={true} />
            ))}
            <SaveButton />
          </ul>
        </section>

        <ApiHandler/>
      </main>

      {/*footer*/}
      <footer>
        <span>By</span>Karl von Gagern - 2024
      </footer>
    </>
  );
}

export default App;
