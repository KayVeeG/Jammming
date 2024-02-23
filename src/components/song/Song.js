import { React, useState } from "react";
import { ReactComponent as PlusIcon } from "./plus.svg";
import styles from "./Song.module.css";

function Song(props) {
    const { song, onAdd } = props;
  const handleAddClick = () => {
    onAdd(song);
  };

  return (
    <>
      <li className={styles.song}>
        <div className={styles.primary}>{song.title}</div>
        <div className={styles.secondary}>
          {song.artist} | {song.album}
        </div>
        <PlusIcon
          aria-label="add song to playlist"
          className={styles.addButton}
          onClick={handleAddClick}
        />
        <div className={styles.line}></div>
      </li>
    </>
  );
}

export default Song;
