import React, { useState } from "react";

function PlaylistName() {
  const [playlistName, setPlaylistName] = useState("");

  const handleChange = (e) => {
    setPlaylistName(e.target.value);
  }

  const handleClick = () => {

  }

  return (
    <>
      <input 
        placeholder="enter a name"
        value={playlistName}
        onChange={handleChange}
        onClick={handleClick}
      />
    </>
  );
}

export default PlaylistName;
