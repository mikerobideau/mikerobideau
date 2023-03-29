import * as React from 'react';
import {FunctionComponent} from "react";

import {Score, Team} from "@/components/MarchMadness/Model";

import styles from '@/styles/MarchMadness.module.css';
import {Card} from "@mui/material";
import Image from "next/image";
import {getTeamStrength} from "@/components/MarchMadness/marchMadness.util";

interface GameCardProps {
    score: Score,
    team: Team
}

const GameCard: FunctionComponent<GameCardProps> = ({score, team}) =>
    <div className={styles.mobileGameCard}>
        <Card sx={{margin: 5}}>
            <div className={styles.gameCardSummary}>
                {score.team1_score > score.team2_score ? 'Won' : 'Lossed'} by {Math.abs(score.team1_score - score.team2_score)} against <span className={styles.gameCardTeamStrength}>{getTeamStrength(score.precise_spread)}</span> opponent (Spread = {score.precise_spread})
            </div>
            <div className={styles.gameCardContent}>
                <div className={styles.gameCardSection}>
                    <h1 className={styles.gameCardGrade}>{score.grade}</h1>
                </div>

                <div className={styles.gameCardSection}>
                    <Image className={styles.teamLogoSmall}
                           width="75"
                           height="75"
                           src={score.team1_logo}
                           alt=""/>
                    <div className={styles.gameCardTeamScore}>{score.team1_score}</div>
                    <div className={styles.gameCardTeamName}>{score.team1}</div>
                </div>

                <div className={styles.gameCardSection}>
                    <Image className={styles.teamLogoSmall}
                           width="75"
                           height="75"
                           src={score.team2_logo}
                           alt=""/>
                    <div className={styles.gameCardTeamScore}>{score.team2_score}</div>
                    <div className={styles.gameCardTeamName}>{score.team2}</div>
                </div>
            </div>
        </Card>
    </div>;

export default GameCard;