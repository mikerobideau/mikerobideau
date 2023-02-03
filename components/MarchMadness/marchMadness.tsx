

import React, {FunctionComponent, useEffect, useState} from "react";

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

import {TeamAutocomplete} from "@/components/MarchMadness/TeamAutocomplete";

import styles from '@/styles/MarchMadness.module.css';
import Header from "@/components/MarchMadness/Header";
import Dashboard from "@/components/MarchMadness/Dashboard";
import Filters from "@/components/MarchMadness/Filters";


interface MarchMadnessProps {
    defaultTeam1: Team,
    defaultTeam2: Team,
    teams: Team[]
}

const opponentStrengths = ['Elite', 'Very strong', 'Strong', 'Above average', 'Average', 'Below average', 'Weak',
    'Very weak', 'Extremely weak'];


const MarchMadness: FunctionComponent<MarchMadnessProps> = ({defaultTeam1, defaultTeam2, teams}) => {
    const [team1Scores, setTeam1Scores] = useState<Score[] | undefined>();
    const [team2Scores, setTeam2Scores] = useState<Score[] | undefined>();
    const [team1FilteredScores, setTeam1FilteredScores] = useState<Score[]>();
    const [team2FilteredScores, setTeam2FilteredScores] = useState<Score[]>();
    const [team1Record, setTeam1Record] = useState<number[]>();
    const [team2Record, setTeam2Record] = useState<number[]>();
    const [team1, setTeam1] = useState<Team>(defaultTeam1);
    const [team2, setTeam2] = useState<Team>(defaultTeam2);
    const [simulationResult, setSimulationResult] = useState<SimulationResult | undefined | null>();
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


    const handleChangeOpponentStrengths = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setSelectedOpponentStrengths(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    return (
        <div className={styles.marchMadness}>
            <Header />
            <Filters teams={teams}
                     team1={team1}
                     team2={team2}
                     selectedOpponentStrengths={selectedOpponentStrengths}
                     opponentStrengths={opponentStrengths}
                     onChangeTeam1={handleChangeTeam1}
                     onChangeTeam2={handleChangeTeam2}
                     onChangeOpponentStrengths={handleChangeOpponentStrengths}/>
            <Dashboard simulationResult={simulationResult}/>
            <div className={styles.scoreTables}>
                {team1Scores && (<ScoreTable scores={team1FilteredScores || []} />)}
                {team2Scores && (<ScoreTable scores={team2FilteredScores || []} />)}
            </div>
        </div>
    );
}

/*
<div className={styles.marchMadness}>
            <div className={styles.reportCards}>
                {team1 && (<div className={styles.reportCard}>
                    <h2>{team1.team} Report Card</h2>
                    {team1Record && team1 && (<>
                        <div className={styles.teamHeaderContainer}>
                            <Image className={styles.teamLogoLarge} width="50" height="50" src={getLogoUrl(team1?.team)} alt=""/>
                            <h4 className={styles.teamHeader}>({team1Record[0]} - {team1Record[1]})</h4>
                        </div>
                    </>)}


                </div>)}

                {team2 && (<div className={styles.reportCard}>
                    <h2>{team2.team} Report Card</h2>
                    {team2Record && team2 && (<>
                        <div className={styles.teamHeaderContainer}>
                            <Image className={styles.teamLogoLarge} width="50" height="50" src={getLogoUrl(team2?.team)} alt=""/>
                            <h4 className={styles.teamHeader}>({team2Record[0]} - {team2Record[1]})</h4>
                        </div>
                    </>)}


                </div>)}
            </div>
        </div>
 */

export default MarchMadness;