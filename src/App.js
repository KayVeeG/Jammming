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

  // fetch api token via implicit grant
  useEffect(() => {
    // Function to parse the access token from the URL hash
    function extractTokenFromUrl() {
      // Get the part of the URL after the hash symbol
      const hashParams = window.location.hash.substring(1).split("&");
      // Reduce the array of hash parameters to an object with key-value pairs
      const tokenDetails = hashParams.reduce((acc, item) => {
        // Split each parameter at the '=' to separate keys and values
        const [key, value] = item.split("=");
        // Decode and assign the value to its corresponding key in the accumulator object
        if (key) acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
      // Return an object containing the access token
      return {
        accessToken: tokenDetails.access_token,
      };
    }

    // Function to store the access token along with the current timestamp in local storage
    function storeTokenInLocalStorage(token) {
      // Create an object with the token and the current timestamp
      const tokenData = {
        value: token, // The actual token value
        timestamp: Date.now(), // The current time in milliseconds since the epoch
      };
      // Convert the object to a string and store it in local storage under 'spotify_access_token'
      localStorage.setItem("spotify_access_token", JSON.stringify(tokenData));
    }

    // Function to retrieve and validate the access token from local storage
    function getTokenFromLocalStorage() {
      // Retrieve the token data string from local storage
      const tokenString = localStorage.getItem("spotify_access_token");
      // If there's nothing stored, return null
      if (!tokenString) return null;

      // Parse the token data string back into an object
      const tokenData = JSON.parse(tokenString);
      // Calculate if the token is expired by comparing the stored timestamp with the current time
      const isExpired = Date.now() - tokenData.timestamp > 3600 * 1000; // 3600 seconds * 1000 milliseconds
      // Return null if the token is expired, otherwise return the token value
      return isExpired ? null : tokenData.value;
    }

    // Extract the access token from the URL using the defined function
    const { accessToken } = extractTokenFromUrl();
    // Attempt to retrieve a valid token from local storage
    const storedToken = getTokenFromLocalStorage();

    // If an access token was found in the URL...
    if (accessToken) {
      console.log("Token Found in URL:", accessToken); // Log the found token
      setAccessToken(accessToken); // Update the React state with the new token
      storeTokenInLocalStorage(accessToken); // Store the new token in local storage
      window.location.hash = ""; // Clear the URL hash to remove the access token
    } else if (!storedToken) {
      // If no valid token is stored (i.e., it's either missing or expired)...
      // Construct the Spotify authorization URL with the necessary parameters
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        "http://localhost:3000"
      )}&scope=${encodeURIComponent(
        "user-read-private playlist-modify-public"
      )}&response_type=token&show_dialog=true`;
      window.location.href = authUrl; // Redirect the browser to the Spotify authorization page
    } else {
      // If a valid token was retrieved from local storage...
      setAccessToken(storedToken); // Update the React state with the stored token
    }
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    console.log("Access Token Updated:", accessToken);
  }, [accessToken]);

  // search function
  async function search() {
    if (searchTerm) {
      console.log("search for " + searchTerm); // Taylor Swift

      const resultType = "track";
      const limit = 7;

      var searchEndpoint =
        "https://api.spotify.com/v1/search?q=" +
        searchTerm +
        "&type=" +
        resultType +
        "&limit=" +
        limit.toString();

      var authParameters = {
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
    // only execute if there is something to be added
    if (addedSongs.length !== 0) {
      console.log("adding a playlist...");

      // get user id
      var authParameters = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      if (accessToken != null) {
        const response = await fetch(
          "https://api.spotify.com/v1/me",
          authParameters
        );

        const data = await response.json(); // convert to json
        console.log(accessToken);
        console.log(data);
      }
    }
  }

  const searchUpdateHandler = (newSearchChange) => {
    setSearchTerm(newSearchChange); // constantly update app.js state variable through onChange handler from searchBar component
  };

  const switchHandler = (songToSwitch) => {
    console.log("switching song...");

    // is true if songToSwitch key matches a song key in resultList
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
