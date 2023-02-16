import * as React from 'react';
import {FunctionComponent, useEffect, useState} from "react";

import Key from "../Key";

import {getDefaultKeyboardClasses, getGuessedLetters, isInCorrectPosition, isLetter} from "../Game/Game.util";

import styles from '@/components/Wordle/Keyboard/keyboard.module.css';

interface KeyboardProps {
    onClick: (key: string) => void;
    guesses: any;
    answer: string;
}

const Keyboard: FunctionComponent<KeyboardProps> = ({onClick, guesses, answer}) => {
    const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const row3 = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'];
    const rows = [row1, row2, row3];

    const [keyColors, setKeyColors] = useState(getDefaultKeyboardClasses());

    const updateKeyboardClasses = () => {
        let out = Object.assign({}, keyColors);
        getGuessedLetters(guesses).forEach((letter: string) => {
           if (out[letter] === 'amber') {
               if (isInCorrectPosition(letter, guesses, answer)) {
                   out[letter] = 'green';
               }
           } else if (out[letter] === null) {
                if (isInCorrectPosition(letter, guesses, answer)) {
                    out[letter] = 'green';
                } else if (answer.toUpperCase().includes(letter)) {
                    out[letter] = 'amber'
                } else {
                    out[letter] = 'gray';
                }
            }
        });
        setKeyColors(out);
    }

    const getColor = (key: string) => isLetter(key) ? keyColors[key.toUpperCase()] : null;

    useEffect(() => {
        window.setTimeout(() => {
            updateKeyboardClasses();
        }, 2500);

    }, [guesses])

    return (
        <div className={styles.keyboardContainer}>
            <div className={styles.keyboard}>
                { rows.map(row => (
                    <div className={styles.keyboardRow}>
                        { row.map(key => <Key color={getColor(key)} onClick={() => onClick(key) } char={key} /> )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Keyboard;