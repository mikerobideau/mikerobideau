//@ts-nocheck
import {FunctionComponent} from "react";

import {TeamAutocomplete} from "@/components/MarchMadness/TeamAutocomplete";
import {
    Checkbox, Container,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {Team} from "@/components/MarchMadness/Model";

import styles from '@/styles/MarchMadness.module.css';

interface FilterProps {
    teams: Team[];
    team1: Team;
    team2: Team;
    selectedOpponentStrengths: string[];
    opponentStrengths: string[];
    onChangeTeam1: (team: Team | null) => void;
    onChangeTeam2: (team: Team | null) => void;
    onChangeOpponentStrengths: (event: SelectChangeEvent) => void;
}

export const Filters: FunctionComponent<FilterProps> = ({
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
                <h4 className={styles.filtersHeader}>FILTERS</h4>
                <div className={styles.filtersInner}>
                    <TeamAutocomplete label="Team 1" value={team1} onChange={onChangeTeam1} teams={teams} />
                    <TeamAutocomplete label="Team 2" value={team2} onChange={onChangeTeam2} teams={teams} />
                    <FormControl sx={{ m: 2, width: 150 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Opponents</InputLabel>
                        <Select
                            multiple
                            value={selectedOpponentStrengths}
                            onChange={onChangeOpponentStrengths}
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
            </div>
        </Container>
    )
}

export default Filters;