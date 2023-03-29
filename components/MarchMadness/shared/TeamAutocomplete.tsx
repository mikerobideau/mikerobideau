import React, {FunctionComponent, useCallback, useMemo} from "react";
import Image from 'next/image'
import {Box} from "@mui/system";
import {Autocomplete, TextField} from "@mui/material";

import {Team} from "@/components/MarchMadness/Model";

import styles from "@/styles/MarchMadness.module.css";

interface TeamSelectProps {
    label: string;
    value: Team | null | undefined;
    onChange: (team: Team | null) => void;
    teams: Team[];
    isMobile?: boolean;
}

export const TeamAutocomplete: FunctionComponent<TeamSelectProps> = ({
                                                                         label,
                                                                         value,
                                                                         onChange,
                                                                         teams,
                                                                         isMobile
}) => {
    const teamsSorted = useMemo(() =>
        teams.sort((a, b) => -b.conference.localeCompare(a.conference)),
        [teams]);

    const findValue = useCallback((value: Team | null | undefined) =>
        teamsSorted.find(team => team.team === value?.team),
        [teamsSorted]);

    return (
        <Autocomplete
            className={styles.teamAutocomplete}
            disablePortal
            id="combo-box-demo"
            options={teamsSorted}
            groupBy={option => option.conference}
            getOptionLabel={option => option.team}
            sx={{width: isMobile ? 400 : 250}}
            renderOption={(props, option) => (
                <Box key={option.team} component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                    <Image key={option.team}
                           loading="lazy"
                           width="20"
                           height="20"
                           src={option.logo}
                           alt=""
                    />
                    {option.team}
                </Box>
            )}
            renderInput={(params) => <TextField {...params} label={label}></TextField>}
            value={findValue(value)}
            onChange={(event: any, newValue: Team | null) => onChange(newValue)}
        />
    );
}