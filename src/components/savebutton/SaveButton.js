import {React, useState} from 'react';
import styles from './SaveButton.module.css';

function SaveButton() {
    return(
        <>
            <button className={styles.saveButton}>
                Save to Spotify
            </button>
        </>
    );
}

export default SaveButton;