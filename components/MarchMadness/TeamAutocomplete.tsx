import React, {FunctionComponent} from "react";
import Image from 'next/image'
import {Box} from "@mui/system";
import {getLogoUrl} from "@/components/MarchMadness/teamLogos.util";
import {Autocomplete, TextField} from "@mui/material";

import {Team} from "@/components/MarchMadness/Model";

import styles from "@/styles/MarchMadness.module.css";

interface TeamSelectProps {
    label: string;
    value: Team | null | undefined;
    onChange: (team: Team | null) => void;
    teams: Team[];
}

export const TeamAutocomplete: FunctionComponent<TeamSelectProps> = ({label, value, onChange, teams}) => {
    return (
        <Autocomplete
            className={styles.teamAutocomplete}
            disablePortal
            id="combo-box-demo"
            options={teams.sort((a, b) => -b.conference.localeCompare(a.conference))}
            groupBy={option => option.conference}
            getOptionLabel={option => option.team}
            sx={{ width: 300 }}
            renderOption={(props, option) => (
                <Box key={option.team} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <Image key={option.team}
                        loading="lazy"
                        width="20"
                        height="20"
                        src={getLogoUrl(option.team)}
                        alt=""
                    />
                    {option.team}
                </Box>
            )}
            renderInput={(params) => <TextField {...params} label={label} ></TextField>}
            value={value}
            onChange={(event: any, newValue: Team | null) => onChange(newValue)}
        />
    );
};