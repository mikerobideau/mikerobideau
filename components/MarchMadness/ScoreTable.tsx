import React, {FunctionComponent} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Image from 'next/image';

import {Score} from "@/components/MarchMadness/Model";
import {getLogoUrl} from "@/components/MarchMadness/teamLogos.util";
import {getOpponentStrength, sortScores} from "@/components/MarchMadness/marchMadness.util";

import styles from '@/styles/MarchMadness.module.css';

interface ScoreTableProps {
    scores: Score[]
}

export const ScoreTable: FunctionComponent<ScoreTableProps> = ({scores}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="medium" aria-label="Scores">
                <TableHead>
                    <TableRow>
                        <TableCell><th>GAME GRADE</th> </TableCell>
                        <TableCell><th>OPPONENT</th></TableCell>
                        <TableCell><th>OPPONENT STRENGTH</th></TableCell>
                        <TableCell><th>EXPECTATION</th></TableCell>
                        <TableCell><th>GAME RESULT</th></TableCell>
                        <TableCell><th>POWER SCORE</th></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortScores(scores).map((row, index) => (
                        <TableRow key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center"
                                       className={['A+', 'A', 'A-'].includes(row.grade) ? `${styles.good} ${styles.grade}` : ['F', 'D-', 'D', 'D+'].includes(row.grade) ? `${styles.bad} ${styles.grade}` : styles.grade }>
                                {row.grade}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Image className={styles.teamLogo} width="20" height="20" src={getLogoUrl(row.team2)} alt=""/>
                                {row.team2}
                            </TableCell>
                            <TableCell
                                className={['Elite', 'Very strong', 'Strong'].includes(getOpponentStrength(row.precise_spread)) ? styles.good : ['Weak', 'Very weak', 'Extremely weak'].includes(getOpponentStrength(row.precise_spread)) ? styles.bad : styles.neutral}>
                                {getOpponentStrength(row.precise_spread)}
                            </TableCell>
                            <TableCell>{row.precise_spread == 0 ? 'Even' : row.precise_spread < 0 ? `Win by ${Math.abs(row.precise_spread)}` : `Lose by ${Math.abs(row.precise_spread)}`}</TableCell>
                            <TableCell
                                className={row.team1_score > row.team2_score ? styles.good : styles.bad}>
                                {row.team1_score > row.team2_score ? 'Won' : 'Lossed'} by {Math.abs(row.team1_score - row.team2_score)}
                            </TableCell>
                            <TableCell>{row.performance_score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}