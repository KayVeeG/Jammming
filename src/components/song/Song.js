import { React, useState } from "react";
import { ReactComponent as PlusIcon } from "./plus.svg";
import styles from "./Song.module.css";

function Song({ title, artist, album }) {
  const handleAddClick = () => {
    console.log("hello world");
  };

  return (
    <>
      <li className={styles.song}>
        <div className={styles.primary}>{title}</div>
        <div className={styles.secondary}>
          {artist} | {album}
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
