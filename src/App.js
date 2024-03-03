import logo from "./logo.svg";
import "./App.css";

import { React, useState, useEffect } from "react";

// import components
import SearchBar from "./components/searchbar/SearchBar";
import Song from "./components/song/Song";
import PlaylistName from "./components/playlistname/PlaylistName";
import SaveButton from "./components/savebutton/SaveButton";
import ApiHandler from "./components/apihandler/ApiHandler";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function App() {
  // general state hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);

  const [addedSongs, setAddedSongs] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  // fetch api

  useEffect(() => {
    // API Access Token
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters) // fetch access token
      .then((result) => result.json()) // convert to json
      .then((data) => setAccessToken(data.access_token));
  }, []);

  // search function
  async function search() {
    if (searchTerm) {
      console.log("search for " + searchTerm); // Taylor Swift

      const resultType = "track";
      const limit = 7;

      const searchEndpoint =
        "https://api.spotify.com/v1/search?q=" +
        searchTerm +
        "&type=" +
        resultType +
        "&limit=" +
        limit.toString();

      const authParameters = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      const response = await fetch(searchEndpoint, authParameters);

      const data = await response.json(); // Convert response to JSON
      console.log(data.tracks.items); // Print the response from spotify

      /*
      {
      title: "Wurst Vacation",
      artist: "Ice Nine Kills",
      album: "Horrorwood",
    },
    */

      const tracks = data.tracks.items.map((track, index) => ({
        // convert response into usable array of objects in jammmings format
        key: index,
        uri: track.uri,
        title: track.name,
        artist: track.artists[0].name, // because artists is array
        album: track.album.name,
      }));

      console.log(tracks);

      // put new tracks into displayed resultlist
      setSongs((prev) => {
        return [...prev, ...tracks];
      });
    }
  }

  async function addPlaylistHandler() {
    console.log("adding a playlist...");

    if (addedSongs.length !== 0) {
      console.log("not empty!");
    }
  }

  const searchUpdateHandler = (newSearchChange) => {
    setSearchTerm(newSearchChange); // constantly update app.js state variable through onChange handler from searchBar component
  };

  const switchHandler = (songToSwitch) => {
    console.log("switching song...");

    // is true if songToSwitch uri matches a song uri in resultList
    const isInResults = songs.some((song) => song.key === songToSwitch.key);

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
        <SearchBar onUpdate={searchUpdateHandler} onSearch={search} />

        {/* songlists */}
        <section className="container">
          <ul className="songResults">
            <h2>Results</h2>
            {songs.map((song) => (
              <Song
                key={song.key}
                song={song}
                onSwitch={switchHandler}
                isAdded={false}
              />
            ))}
          </ul>
          <ul className="playlist">
            <PlaylistName />
            {addedSongs.map((song) => (
              <Song
                key={song.key}
                song={song}
                onSwitch={switchHandler}
                isAdded={true}
              />
            ))}
            <SaveButton OnClick={addPlaylistHandler} />
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
