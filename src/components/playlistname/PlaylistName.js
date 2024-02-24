import React, { useState } from "react";
import styles from './PlaylistName.module.css';

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
        placeholder=""
        value={playlistName}
        onChange={handleChange}
        onClick={handleClick}
        className={styles.nameInput}
      />
    </>
  );
}

export default PlaylistName;
