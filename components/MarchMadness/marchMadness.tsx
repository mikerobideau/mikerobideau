import React, {FunctionComponent, useEffect, useState} from "react";
import {Box} from "@mui/system";
import {
    AppBar, Container,
    Hidden,
    SelectChangeEvent, SwipeableDrawer,
    Toolbar,
    Typography
} from "@mui/material";

import {Score, SimulationResult, Team} from "@/components/MarchMadness/Model";
import {getFilteredScores, sortScores} from "@/components/MarchMadness/marchMadness.util";
import {getScores, simulate} from "@/components/MarchMadness/marchMadnessService";
import DesktopHeader from "@/components/MarchMadness/desktop/DesktopHeader";
import DesktopFilters from "@/components/MarchMadness/desktop/DesktopFilters";
import {ForceGraph} from "@/components/MarchMadness/shared/ForceGraph/ForceGraph";

import styles from '@/styles/MarchMadness.module.css';
import {TeamAutocomplete} from "@/components/MarchMadness/shared/TeamAutocomplete";
import MobileFilters from "@/components/MarchMadness/mobile/MobileFilters";
import GameCard from "@/components/MarchMadness/mobile/GameCard";
import {ScoreTable} from "@/components/MarchMadness/desktop/ScoreTable";

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
    const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);

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
            setSimulationResult(null);
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
            <Hidden lgDown>
                <DesktopHeader />
                <DesktopFilters teams={teams}
                                team1={team1}
                                team2={team2}
                                selectedOpponentStrengths={selectedOpponentStrengths}
                                opponentStrengths={opponentStrengths}
                                onChangeTeam1={handleChangeTeam1}
                                onChangeTeam2={handleChangeTeam2}
                                onChangeOpponentStrengths={handleChangeOpponentStrengths}/>
            </Hidden>

            <Hidden lgUp>
                <Box sx={{ flexGrow: 1, marginBottom: '1rem'}}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                March Madness
                            </Typography>
                            <span>2022-2023</span>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Hidden>

            <Container>
                <TeamAutocomplete label="Show Grades For"
                                  value={showScoresFor}
                                  onChange={handleChangeShowScoresFor}
                                  teams={teams.filter(team => [team1.team, team2.team].includes(team.team))} />
            </Container>

            <Hidden lgDown>
                <Container>
                    <div className={styles.scoreTable}>
                        {team1Scores && teams && team1 && showScoresFor?.team === team1.team && (<ScoreTable scores={team1FilteredScores || []} teams={teams}/>)}
                        {team2Scores && teams && team2 && showScoresFor?.team === team2.team && (<ScoreTable scores={team2FilteredScores || []} teams={teams} />)}
                    </div>
                </Container>
            </Hidden>

            <Hidden lgUp>
                {team1Scores && teams && team1 && showScoresFor?.team === team1.team && (sortScores(team1FilteredScores || [])?.map(score => <GameCard score={score} teams={teams}/>))}
                {team2Scores && teams && team2 && showScoresFor?.team === team2.team && (sortScores(team2FilteredScores || [])?.map(score => <GameCard score={score} teams={teams}/>))}
            </Hidden>

            <Hidden lgUp>
                <SwipeableDrawer
                    anchor="top"
                    open={isMobileFilterVisible}
                    onClose={() => setIsMobileFilterVisible(false)}
                    onOpen={() => true}
                >
                    <MobileFilters teams={teams}
                                   team1={team1}
                                   team2={team2}
                                   selectedOpponentStrengths={selectedOpponentStrengths}
                                   opponentStrengths={opponentStrengths}
                                   onChangeTeam1={handleChangeTeam1}
                                   onChangeTeam2={handleChangeTeam2}
                                   onChangeOpponentStrengths={handleChangeOpponentStrengths}
                                   onClose={() => setIsMobileFilterVisible(false)}/>
                </SwipeableDrawer>
            </Hidden>

        </div>
    );
}

/*
    {simulationResult && (<ForceGraph nodesData={simulationResult.forceNodes} />)}
 */

export default MarchMadness;