//@ts-nocheck
import {FunctionComponent} from "react";
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

interface OpponentSelectProps {
    values: string[];
    onChange: (event: SelectChangeEvent) => void;
    opponentStrengths: string[];
    isMobile?: boolean;
}

const OpponentSelect: FunctionComponent<OpponentSelectProps> = ({
                                                                    values,
                                                                    onChange,
                                                                    opponentStrengths,
                                                                    isMobile}) =>
    <FormControl sx={{ m: 2, width: isMobile ? 400 : 250 }}>
        <InputLabel id="demo-multiple-checkbox-label">Opponents</InputLabel>
        <Select
            multiple
            value={values}
            onChange={onChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={() => values.length === opponentStrengths.length
                ? 'All'
                : values.join(', ')}
        >
            {opponentStrengths.map((strength) => (
                <MenuItem key={strength} value={strength}>
                    <Checkbox checked={values.indexOf(strength) > -1} />
                    <ListItemText primary={strength} />
                </MenuItem>
            ))}
        </Select>
    </FormControl>

export default OpponentSelect;