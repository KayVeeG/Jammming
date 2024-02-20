import { React, useState } from "react";

function Song({ title, artist, album }) {

    const handleAddClick = () => {
        //empty still
    }

  return <>
    <li className="song">
        <button
            aria-label="add song to playlist"
            className="add-button"
            onClick={handleAddClick}
        >

        </button>
        <div className="primary">{title}</div>
        <div className="secondary">{artist} | {album}</div>
    </li>
  </>;
}

export default Song;
