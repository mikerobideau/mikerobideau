import React, {FunctionComponent} from "react";
import {Container, Hidden} from "@mui/material";

import styles from '@/styles/MarchMadness.module.css';

const DesktopHeader: FunctionComponent = () => {
    return (
        <Container>
            <div className={styles.marchMadnessHeaderContainer}>
                <h1 className={styles.marchMadnessHeader}>22-23 March Madness</h1>
                <h2 className={styles.marchMadnessSubheader}>Simulate Matchups and Browse Game Grades</h2>
                <Hidden mdDown>
                    <h2 className={styles.marchMadnessDescription}>
                        <div className={styles.descriptionContainer}>
                            <span>&nbsp;Grades are scored by strength of opponent and margin of victory.</span>
                        </div>
                        <div className={styles.descriptionContainer}>
                            <span>&nbsp;Win probabilities and grades update when filters change.</span>
                        </div>
                    </h2>
                </Hidden>
            </div>
        </Container>
    )
}

export default DesktopHeader;