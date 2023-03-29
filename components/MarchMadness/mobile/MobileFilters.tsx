import * as React from 'react';
import {FunctionComponent} from "react";

import {TeamAutocomplete} from "@/components/MarchMadness/shared/TeamAutocomplete";
import OpponentSelect from "@/components/MarchMadness/shared/OpponentSelect";
import {Team} from "@/components/MarchMadness/Model";
import {Button, Divider, SelectChangeEvent} from "@mui/material";

import styles from '@/styles/MarchMadness.module.css';

interface MobileFilterProps {
    teams: Team[];
    team1: Team;
    team2: Team;
    selectedOpponentStrengths: string[];
    opponentStrengths: string[];
    onChangeTeam1: (team: Team | null) => void;
    onChangeTeam2: (team: Team | null) => void;
    onChangeOpponentStrengths: (event: SelectChangeEvent) => void;
    onClose: () => void;
}

const MobileFilters: FunctionComponent<MobileFilterProps> = ({
    teams,
    team1,
    team2,
    selectedOpponentStrengths,
    opponentStrengths,
    onChangeTeam1,
    onChangeTeam2,
    onChangeOpponentStrengths,
    onClose
                                                             }) =>
    <div className={styles.mobileFilters}>
        <div className={styles.mobileFilterHeaderContainer}>
            <h4 className={styles.mobileFiltersHeader}>
                Matchup
            </h4>
        </div>
        <div className={styles.mobileFilterOptionContainer}>
            <h5>Choose a team</h5>
            <TeamAutocomplete isMobile label="Team 1" value={team1} onChange={onChangeTeam1} teams={teams} />
        </div>

        <Divider />
        <div className={styles.mobileFilterOptionContainer}>
            <h5>Choose an opponent</h5>
            <TeamAutocomplete isMobile label="Team 2" value={team2} onChange={onChangeTeam2} teams={teams} />
        </div>
        <Divider />
        <div className={styles.mobileFilterOptionContainer}>
            <h5>Consider games against</h5>
            <OpponentSelect isMobile values={selectedOpponentStrengths}
                            onChange={onChangeOpponentStrengths}
                            opponentStrengths={opponentStrengths} />
        </div>
        <div className={styles.mobileFiltersDoneContainer}>
            <Button onClick={onClose} variant="contained">Done</Button>
        </div>

    </div>;

export default MobileFilters;