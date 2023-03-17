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

export type color = 'amber' | 'green' | 'gray';

const Keyboard: FunctionComponent<KeyboardProps> = ({onClick, guesses, answer}) => {
    const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const row3 = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'];
    const rows = [row1, row2, row3];

    const [keyColors, setKeyColors] = useState(getDefaultKeyboardClasses());

    const updateKeyboardClasses = () => {
        let newKeyboardClasses: any = Object.assign({}, keyColors);
        getGuessedLetters(guesses).forEach((letter: string) => {
           if (newKeyboardClasses[letter] === 'amber') {
               if (isInCorrectPosition(letter, guesses, answer)) {
                   newKeyboardClasses[letter] = 'green';
               }
           } else if (newKeyboardClasses[letter] === null) {
                if (isInCorrectPosition(letter, guesses, answer)) {
                    newKeyboardClasses[letter] = 'green';
                } else if (answer.toUpperCase().includes(letter)) {
                    newKeyboardClasses[letter] = 'amber'
                } else {
                    newKeyboardClasses[letter] = 'gray';
                }
            }
        });
        setKeyColors(newKeyboardClasses);
    }

    const getColor = (key: string): color => isLetter(key)
        //@ts-ignore
        ? keyColors[key.toUpperCase()]
        : null;

    useEffect(() => {
        window.setTimeout(() => {
            updateKeyboardClasses();
        }, 2500);

    }, [guesses])

    return (
        <div className={styles.keyboardContainer}>
            <div className={styles.keyboard}>
                { rows.map((row, index) => (
                    <div className={styles.keyboardRow} key={index}>
                        { row.map((key, i) => <Key color={getColor(key)} onClick={() => onClick(key) } char={key} key={i}/> )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Keyboard;