
import React, {FunctionComponent, useEffect, useMemo, useState} from "react";

import {
    Container,
    SelectChangeEvent
} from "@mui/material";

import {Score, SimulationResult, Team} from "@/components/MarchMadness/Model";
import {getFilteredScores} from "@/components/MarchMadness/marchMadness.util";
import {getScores, simulate} from "@/components/MarchMadness/marchMadnessService";
import {ScoreTable} from "@/components/MarchMadness/ScoreTable";
import Header from "@/components/MarchMadness/Header";
import Dashboard from "@/components/MarchMadness/Dashboard";
import Filters from "@/components/MarchMadness/Filters";

import styles from '@/styles/MarchMadness.module.css';
import {TeamAutocomplete} from "@/components/MarchMadness/TeamAutocomplete";

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
    const [showScoresFor, setShowScoresFor] = useState<Team>();
    const [team1, setTeam1] = useState<Team>(defaultTeam1);
    const [team2, setTeam2] = useState<Team>(defaultTeam2);
    const [simulationResult, setSimulationResult] = useState<SimulationResult | undefined | null>();
    const [selectedOpponentStrengths, setSelectedOpponentStrengths] = useState<string[]>(opponentStrengths);

    useEffect(() => {
        (async() => {
            if (team1) {
                setShowScoresFor(team1);
                setTeam1Scores(await getScores(team1.team));
            }
        })();
    }, [team1]);

    useEffect(() => {
        (async() => {
            if (team2) {
                setShowScoresFor(team2);
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

    const handleChangeShowScoresFor = (team: Team | null) => {
        if (team) {
            setShowScoresFor(team);
        }
    }

    const simulateGames = async () => {
        if (team1 && team2 && team1FilteredScores && team2FilteredScores) {
            const result = await simulate(team1.team, team1FilteredScores, team2.team, team2FilteredScores);
            setSimulationResult(result);
        }
    }

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
            <Dashboard team1={team1} team2={team2} simulationResult={simulationResult}/>
            <Container>
                <TeamAutocomplete label="Show Grades For"
                                  value={showScoresFor}
                                  onChange={handleChangeShowScoresFor}
                                  teams={teams.filter(team => [team1.team, team2.team].includes(team.team))} />
                <div className={styles.scoreTable}>
                    {team1Scores && teams && team1 && showScoresFor?.team === team1.team && (<ScoreTable scores={team1FilteredScores || []} teams={teams}/>)}
                    {team2Scores && teams && team2 && showScoresFor?.team === team2.team && (<ScoreTable scores={team2FilteredScores || []} teams={teams} />)}
                </div>
            </Container>
        </div>
    );
}

export default MarchMadness;