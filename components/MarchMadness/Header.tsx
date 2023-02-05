import React, {FunctionComponent} from "react";
import {Container} from "@mui/material";

import styles from '@/styles/MarchMadness.module.css';

const Header: FunctionComponent = () => {
    return (
        <Container>
            <h1 className={styles.marchMadnessHeader}>2022-2023 March Madness Dashboard</h1>
            <h2 className={styles.marchMadnessSubheader}>Simulate Head-to-Head Matchups and Browse Regular Season Game Grades</h2>
            <h2 className={styles.marchMadnessDescription}>
                <span className={styles.boldHeader}>Simulation:</span>&nbsp;Uses Monte Carlo sampling method from regular season game <span className={styles.boldHeader}>grades.</span>
            </h2>
            <h2 className={styles.marchMadnessDescription}>
                <span className={styles.boldHeader}>Grades:</span>&nbsp;Adjusted for scoring differential and strength of opponent.
            </h2>
        </Container>
    )
}

export default Header;