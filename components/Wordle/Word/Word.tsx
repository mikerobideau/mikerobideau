import * as React from 'react';
import {FunctionComponent} from "react";
import Letter from "../Letter";

import styles from '@/components/Wordle/Word/word.module.css';

interface WordProps {
    guess: string;
    answer: string;
    placeholder: string[];
    isComplete: boolean;
}

const Word: FunctionComponent<WordProps> = ({guess, answer, placeholder, isComplete}) => {
    return (
        <div className={styles.word}>
            { placeholder.map((value ,index) => <Letter key={index}
                                                        index={index}
                                                        letter={guess ? guess[index] : null}
                                                        isComplete={isComplete}
                                                        isCorrectPosition={guess ? guess[index] === answer[index] : false}
                                                        isInWord={guess ? answer.includes(guess[index]) : false} /> )}
        </div>
    )
};

export default Word;