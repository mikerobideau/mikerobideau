import * as _ from 'lodash';

export const placeholders = [
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*']
];

export const ALPHABET = ['A','B','C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const isLetter = (key: string) => ALPHABET.includes(key.toUpperCase());

export const getGuessKey = (index: number): string => `guess${index + 1}`;

export const updateCompletedGuesses = (prevGuessCompletion: Map<string, string>, guessIndex: number, guess: string) => ({
    ...prevGuessCompletion,
    [getGuessKey(guessIndex)]: guess
});

export const getGuess = (guessIndex: number, index: number, guess: string, completedGuesses: Map<string, string>): string | null => {
    if (guessIndex === index) {
        return guess;
    } else if (guessIndex > index) {
        return completedGuesses[getGuessKey(index)];
    } else {
        return null;
    }
}

export const getVictoryMessage = (guesses: number): string => {
    switch (guesses) {
        case 1:
            return 'Miraculous'
        case 2:
            return 'Crushed it'
        case 3:
            return 'Impressive'
        case 4:
            return 'Nice'
        case 5:
            return 'There it is'
        case 6:
            return 'Phew'
        default:
            return 'Finished'
    }

}

export const getDefaultKeyboardClasses = () => {
    const keyboardClasses = {};
    ALPHABET.forEach(letter => keyboardClasses[letter] = null);
    return keyboardClasses;
}

export const getGuessedLetters = (guesses) =>
    _.uniq(Object.values(guesses)
        .filter(guess => guess !== null)
        .join('')
        .toUpperCase());

export const isInCorrectPosition = (letter, guesses, answer) => {
    let guessValues = Object.values(guesses).filter(guess => guess !== null);
    for (let i = 0; i < guessValues.length; i++) {
        let guess = guessValues[i];
        for (let j = 0; j < 5; j++) {
            if (guess[j].toUpperCase() === letter && answer[j].toUpperCase() === letter) {
                return true;
            }
        }
    }
    return false;
}