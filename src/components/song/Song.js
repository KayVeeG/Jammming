import { React, useState } from "react";
import styles from "./Song.module.css";

function Song({ title, artist, album }) {
  const handleAddClick = () => {
    //empty still
  };

  return (
    <>
      <li className={styles.song}>
        <div className={styles.primary}>{title}</div>
        <div className={styles.secondary}>
          {artist} | {album}
        </div>
        <button
          aria-label="add song to playlist"
          className={styles.addButton}
          onClick={handleAddClick}
        >
          add
        </button>
      </li>
    </>
  );
}

export default Song;
