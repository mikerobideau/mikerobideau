import React, {FunctionComponent} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Image from 'next/image';

import {Score, Team} from "@/components/MarchMadness/Model";
import {getOpponentStrength, sortScores} from "@/components/MarchMadness/marchMadness.util";

import styles from '@/styles/MarchMadness.module.css';

interface ScoreTableProps {
    scores: Score[]
    teams: Team[]
}

export const ScoreTable: FunctionComponent<ScoreTableProps> = ({scores, teams}) => {
    return (
        <div className={styles.scoreTable}>
            {scores && teams && (<TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="medium" aria-label="Scores">
                    <TableHead>
                        <TableRow>
                            <TableCell><th>TEAM</th></TableCell>
                            <TableCell><th>OPPONENT</th></TableCell>
                            <TableCell><th>OPPONENT STRENGTH</th></TableCell>
                            <TableCell><th>EXPECTATION</th></TableCell>
                            <TableCell><th>RESULT</th></TableCell>
                            <TableCell><th>GRADE</th></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortScores(scores).map((row, index) => (
                            <TableRow key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Image className={styles.teamLogo} width="40" height="40" src={row.team1_logo} alt=""/>
                                    {row.team1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Image className={styles.teamLogo} width="40" height="40" src={row.team2_logo} alt=""/>
                                    {row.team2}
                                </TableCell>
                                <TableCell
                                    className={['Elite', 'Very strong', 'Strong'].includes(getOpponentStrength(row.precise_spread)) ? styles.good : ['Weak', 'Very weak', 'Extremely weak'].includes(getOpponentStrength(row.precise_spread)) ? styles.bad : styles.neutral}>
                                    {getOpponentStrength(row.precise_spread)}
                                </TableCell>
                                <TableCell>{row.precise_spread == 0 ? 'Even' : row.precise_spread < 0 ? `Win by ${Math.abs(row.precise_spread).toFixed(0)}` : `Lose by ${Math.abs(row.precise_spread).toFixed(0)}`}</TableCell>
                                <TableCell
                                    className={row.team1_score > row.team2_score ? styles.good : styles.bad}>
                                    {row.team1_score > row.team2_score ? 'Won' : 'Lossed'} by {Math.abs(row.team1_score - row.team2_score)}
                                </TableCell>
                                <TableCell align="center">
                                        {row.performance_score.toFixed(0)}
                                        <span
                                            className={['A+', 'A', 'A-'].includes(row.grade) ? `${styles.good} ${styles.grade}` : ['F', 'D-', 'D', 'D+'].includes(row.grade) ? `${styles.bad} ${styles.grade}` : styles.grade }>
                                            {row.grade}
                                        </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>)}
        </div>
    )
}