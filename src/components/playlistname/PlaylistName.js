import React, { useState } from "react";
import styles from "./PlaylistName.module.css";

function PlaylistName({ playlistNameHandler, newPlaylistName }) {

  const handleChange = (e) => {
    playlistNameHandler(e.target.value);
  };

  const handleClick = () => {};

  return (
    <>
      <input
        placeholder=""
        value={newPlaylistName}
        onChange={handleChange}
        onClick={handleClick}
        className={styles.nameInput}
      />
    </>
  );
}

export default PlaylistName;
