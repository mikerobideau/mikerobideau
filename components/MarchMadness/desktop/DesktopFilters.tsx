import {FunctionComponent} from "react";

import {TeamAutocomplete} from "@/components/MarchMadness/shared/TeamAutocomplete";
import {
    Checkbox, Container,
    FormControl,
    Grid, Hidden,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {Team} from "@/components/MarchMadness/Model";

import styles from '@/styles/MarchMadness.module.css';
import OpponentSelect from "@/components/MarchMadness/shared/OpponentSelect";

interface DesktopFilterProps {
    teams: Team[];
    team1: Team;
    team2: Team;
    selectedOpponentStrengths: string[];
    opponentStrengths: string[];
    onChangeTeam1: (team: Team | null) => void;
    onChangeTeam2: (team: Team | null) => void;
    onChangeOpponentStrengths: (event: SelectChangeEvent) => void;
}

export const DesktopFilters: FunctionComponent<DesktopFilterProps> = ({
                                                            teams,
                                                            team1,
                                                            team2,
                                                            selectedOpponentStrengths,
                                                            opponentStrengths,
                                                            onChangeTeam1,
                                                            onChangeTeam2,
                                                            onChangeOpponentStrengths}) => {
    return (
        <Container>
            <div className={styles.filters}>
                <div className={styles.filtersInner}>
                    <TeamAutocomplete label="Team 1" value={team1} onChange={onChangeTeam1} teams={teams} />
                    <TeamAutocomplete label="Team 2" value={team2} onChange={onChangeTeam2} teams={teams} />
                    <OpponentSelect values={selectedOpponentStrengths}
                                    onChange={onChangeOpponentStrengths}
                                    opponentStrengths={opponentStrengths} />
                </div>
            </div>
        </Container>
    )
}

export default DesktopFilters;