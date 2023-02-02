//@ts-nocheck

import React, {FunctionComponent, useEffect, useState} from "react";
import Image from 'next/image';
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";

import {Score, SimulationResult, Team} from "@/components/MarchMadness/Model";
import {getFilteredScores, getRecord} from "@/components/MarchMadness/marchMadness.util";
import {getScores, simulate} from "@/components/MarchMadness/marchMadnessService";
import {ScoreTable} from "@/components/MarchMadness/ScoreTable";
import {getLogoUrl} from "@/components/MarchMadness/teamLogos.util";
import {TeamAutocomplete} from "@/components/MarchMadness/TeamAutocomplete";

import styles from '@/styles/MarchMadness.module.css';


interface MarchMadnessProps {
    defaultTeam1: Team,
    defaultTeam2: Team,
    teams: Team[]
}

const MarchMadness: FunctionComponent<MarchMadnessProps> = ({defaultTeam1, defaultTeam2, teams}) => {
    const [team1Scores, setTeam1Scores] = useState<Score[] | undefined>();
    const [team2Scores, setTeam2Scores] = useState<Score[] | undefined>();
    const [team1FilteredScores, setTeam1FilteredScores] = useState<Score[]>();
    const [team2FilteredScores, setTeam2FilteredScores] = useState<Score[]>();
    const [team1Record, setTeam1Record] = useState<number[]>();
    const [team2Record, setTeam2Record] = useState<number[]>();
    const [team1, setTeam1] = useState<Team | null>(defaultTeam1);
    const [team2, setTeam2] = useState<Team | null>(defaultTeam2);
    const [simulationResult, setSimulationResult] = useState<SimulationResult | undefined | null>();
    const opponentStrengths = ['Elite', 'Very strong', 'Strong', 'Above average', 'Average', 'Below average', 'Weak',
        'Very weak', 'Extremely weak'];
    const [selectedOpponentStrengths, setSelectedOpponentStrengths] = useState<string[]>(opponentStrengths);

    useEffect(() => {
        (async() => {
            if (team1) {
                setTeam1Scores(await getScores(team1.team));
            }
        })();
    }, [team1]);

    useEffect(() => {
        (async() => {
            if (team2) {
                setTeam2Scores(await getScores(team2.team));
            }
        })();
    }, [team2]);

    const handleChangeTeam1 = (team: Team | null) => {
        if (team) {
            setTeam1(team);
        }
    }

    const handleChangeTeam2 = (team: Team | null) => {
        if (team) {
            setTeam2(team);
        }
    }

    const simulateGames = async () => {
        if (team1 && team2 && team1FilteredScores && team2FilteredScores) {
            const result = await simulate(team1.team, team1FilteredScores, team2.team, team2FilteredScores);
            setSimulationResult(result);
        }
    }

    useEffect(() => {
        if (team1Scores) {
            setTeam1Record(getRecord(team1Scores));
        }
    }, [team1Scores]);

    useEffect(() => {
        if (team2Scores) {
            setTeam2Record(getRecord(team2Scores));
        }
    }, [team2Scores]);

    useEffect(() => {
        setTeam1FilteredScores(getFilteredScores(team1Scores, selectedOpponentStrengths));
        setTeam2FilteredScores(getFilteredScores(team2Scores, selectedOpponentStrengths));
    }, [selectedOpponentStrengths, team1Scores, team2Scores, getFilteredScores]);

    useEffect(() => {
        (async() => {
            simulateGames()
        })();
    }, [team1FilteredScores, team2FilteredScores]);


    const handleOnChangeOpponentStrengths = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setSelectedOpponentStrengths(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    return (
        <div className={styles.marchMadness}>
            <div className={styles.gameSimulator}>
                <h1>Game Simulator</h1>
                <div className={styles.gameSimulatorFilters}>
                    <TeamAutocomplete label="Team 1" value={team1} onChange={handleChangeTeam1} teams={teams} />
                    <TeamAutocomplete label="Team 2" value={team2} onChange={handleChangeTeam2} teams={teams} />
                    <FormControl sx={{ m: 2, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Opponents</InputLabel>
                        <Select
                            multiple
                            value={selectedOpponentStrengths}
                            onChange={handleOnChangeOpponentStrengths}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={() => selectedOpponentStrengths.length === opponentStrengths.length
                                ? 'All'
                                : selectedOpponentStrengths.join(', ')}
                        >
                            {opponentStrengths.map((strength) => (
                                <MenuItem key={strength} value={strength}>
                                    <Checkbox checked={selectedOpponentStrengths.indexOf(strength) > -1} />
                                    <ListItemText primary={strength} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                {simulationResult && (
                    <div className={styles.simulationResult}>
                        <h4 className={styles.simulationResultText}>{simulationResult?.team1} wins {simulationResult.team1WinPct},</h4>
                        <h4 className={styles.simulationResultText}>{simulationResult?.team2} wins {simulationResult.team2WinPct}</h4>
                    </div>)}
                </div>
            </div>
            <hr/>
            <div className={styles.reportCards}>
                {team1 && (<div className={styles.reportCard}>
                    <h2>{team1.team} Report Card</h2>
                    {team1Record && team1 && (<>
                        <div className={styles.teamHeaderContainer}>
                            <Image className={styles.teamLogoLarge} width="50" height="50" src={getLogoUrl(team1?.team)} alt=""/>
                            <h4 className={styles.teamHeader}>({team1Record[0]} - {team1Record[1]})</h4>
                        </div>
                    </>)}

                    {team1Scores && (<ScoreTable scores={team1FilteredScores || []} />)}
                </div>)}

                {team2 && (<div className={styles.reportCard}>
                    <h2>{team2.team} Report Card</h2>
                    {team2Record && team2 && (<>
                        <div className={styles.teamHeaderContainer}>
                            <Image className={styles.teamLogoLarge} width="50" height="50" src={getLogoUrl(team2?.team)} alt=""/>
                            <h4 className={styles.teamHeader}>({team2Record[0]} - {team2Record[1]})</h4>
                        </div>
                    </>)}

                    {team2Scores && (<ScoreTable scores={team2FilteredScores || []} />)}
                </div>)}
            </div>
        </div>
    );
}

export default MarchMadness;