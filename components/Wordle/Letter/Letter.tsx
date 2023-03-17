import * as React from 'react';
import {FunctionComponent, useCallback} from "react";

import styles from './letter.module.css';

interface LetterProps {
    letter: string | null;
    isComplete: boolean;
    isCorrectPosition: boolean;
    isInWord: boolean;
    index: number;
}

const Letter: FunctionComponent<LetterProps> = ({letter, isComplete, isCorrectPosition,
                                                    isInWord, index}) => {

    const getIndexClass = () => {
        if (index === 0) {
            return styles.letter1;
        } else if (index === 1) {
            return styles.letter2;
        } else if (index === 2) {
            return styles.letter3;
        } else if (index === 3) {
            return styles.letter4;
        } else if (index === 4) {
            return styles.letter5;
        }
    }

    const getFrontClass = useCallback(() => !!letter ? styles.inProgress : styles.empty,
        [letter, isComplete]);

    const getBackClass = useCallback(() => {
        if (isCorrectPosition) {
            return styles.inCorrectPosition;
        } else if (isInWord) {
            return styles.inWord;
        } else {
            return styles.notInWord;
        }
    }, [letter, isComplete]);

    return (
      <div className={styles.letterContainer}>
          <div className={`${styles.letter} ${getIndexClass()} ${isComplete ? styles.flipped: ''}`}>
              <div className={`${styles.front} ${styles.letter} ${getFrontClass()}`}>{letter}</div>
              <div className={`${styles.back} ${styles.letter} ${getBackClass()}`}>{letter}</div>
          </div>
      </div>  
    );
};

export default Letter;