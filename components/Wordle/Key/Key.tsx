import {FunctionComponent} from "react";

import styles from '@/components/Wordle/Key/key.module.css';

interface KeyProps {
    char: string;
    onClick: () => void;
    color: string;
}

const Key: FunctionComponent<KeyProps> = ({char, onClick, color}) => {
    const getColorStyle = (color: string) => {
        switch (color) {
            case 'green':
                return styles.green;
            case 'amber':
                return styles.amber;
            case 'gray':
                return styles.gray;
            default:
                return null;
        }
    }

    return (
        <div className={`${styles.key} ${getColorStyle(color)} ${char.toUpperCase() === 'ENTER' ? styles.enter : ''}`}
             onClick={onClick}>
            {char.toUpperCase() === 'BACKSPACE' &&
                <span className={styles.backspace}><img className={styles.backspaceIcon} src="icons/backspace.png" /></span>}
            {char.toUpperCase() !== 'BACKSPACE' && <span>{char}</span>}
        </div>
    )
}

export default Key;