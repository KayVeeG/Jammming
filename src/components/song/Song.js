import { React, useState } from "react";
import { ReactComponent as PlusIcon } from "./plus.svg"; // import svg
import { ReactComponent as MinusIcon } from "./minus.svg"; // import svg
import styles from "./Song.module.css";

function Song({ song, onSwitch, isAdded }) {
  const handleAddClick = () => {
    console.log("clicked add");
    onSwitch(song);
  };

  const handleRemoveClick = () => {
    console.log("clicked remove");
    onSwitch(song);
  };

  return (
    <>
      <li className={styles.song}>
        <div className={styles.primary}>{song.title}</div>
        <div className={styles.secondary}>
          {song.artist} | {song.album}
        </div>
        {!isAdded ? (
          <PlusIcon
            aria-label="add song to playlist"
            className={styles.button}
            onClick={handleAddClick}
          />
        ) : (
          <MinusIcon
            aria-label="remove song from playlist"
            className={styles.button}
            onClick={handleRemoveClick}
          />
        )}

        <div className={styles.line}></div>
      </li>
    </>
  );
}

export default Song;
