import {React, useState} from 'react';
import styles from './SaveButton.module.css';

function SaveButton({ OnClick }) {
    return(
        <>
            <button className={styles.saveButton} onClick={OnClick}>
                Save to Spotify
            </button>
        </>
    );
}

export default SaveButton;