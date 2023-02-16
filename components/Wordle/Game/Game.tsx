import * as React from 'react';
import {FunctionComponent, useCallback, useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";

import Word from "../Word";
import {
    placeholders,
    getGuessKey,
    updateCompletedGuesses,
    getGuess,
    isLetter, getVictoryMessage
} from "./Game.util";
import Keyboard from "../Keyboard";
import NavBar from "../NavBar";

import styles from '@/components/Wordle/Game/game.module.css';

interface GameProps {
    answer: string;
}

const Game: FunctionComponent<GameProps> = ({answer}) => {
    const [guess, setGuess] = useState<string>('');
    const [prevGuess, setPrevGuess] = useState<string>('');
    const [guessIndex, setGuessIndex] = useState(0);
    const [completeGuesses, setCompleteGuesses]  = useState({
        guess1: null,
        guess2: null,
        guess3: null,
        guess4: null,
        guess5: null,
    });
    const [isWin, setIsWin] = useState(false);

    const handleEnter = useCallback(() => {
        if (guess.length === 5) {
            setCompleteGuesses(prevCompletedGuesses => updateCompletedGuesses(prevCompletedGuesses, guessIndex,
                guess));
            setGuessIndex(prevIndex => prevIndex + 1);
            setPrevGuess(guess);
            setGuess('');
        }
    }, [guess]);

    const onKeyboardClick = useCallback((key: string) => {
        if (isWin || guessIndex > 5) {
            return;
        } if (isLetter(key) && guess.length < 5) {
            setGuess(prevGuess => prevGuess.concat(key));
        } else if (key.toUpperCase() === 'BACKSPACE' && guess.length > 0) {
            setGuess(prevGuess => prevGuess.slice(0, prevGuess.length - 1));
        } else if (key.toUpperCase() === 'ENTER') {
            handleEnter();
        }
    }, [isWin, guess, guessIndex, handleEnter]);

    useEffect(() => {
        if (prevGuess.toUpperCase() === answer.toUpperCase()) {
            setIsWin(true);
            window.setTimeout(() => {
                toast.success(getVictoryMessage(guessIndex));
            }, 2500);
        }
    }, [guess]);

    const handleKeyPress = (event: any) => {
        event.preventDefault();
        onKeyboardClick(event.key);
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress])

    return (
        <div className={styles.game}>
            <NavBar />
            <Toaster
                position="top-center"
                reverseOrder={false}/>
            <div className={styles.boardContainer}>
                <div className={styles.board}>
                    {placeholders.map((placeholder, index) => <Word
                        key={index}
                        placeholder={placeholder}
                        guess={getGuess(guessIndex, index, guess, completeGuesses)?.toUpperCase()}
                        answer={answer.toUpperCase()}
                        isComplete={!!completeGuesses[getGuessKey(index)]} /> )}
                </div>
            </div>
            <div className={styles.keyboardContainer}>
                <Keyboard onClick={onKeyboardClick} guesses={completeGuesses} answer={answer}/>
            </div>
        </div>
    );
};

export default Game;