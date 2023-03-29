import {FunctionComponent} from "react";
import Image from 'next/image';
import {Button, Container, Hidden} from "@mui/material";

import FilterListIcon from '@mui/icons-material/FilterList';

import {SimulationResult, Team} from "@/components/MarchMadness/Model";
import WinPct from "@/components/MarchMadness/shared/WinPct";
import {getTeamStrength} from "@/components/MarchMadness/marchMadness.util";

import styles from '@/styles/MarchMadness.module.css';

interface DashboardProps {
    team1: Team;
    team2: Team;
    simulationResult: SimulationResult | null | undefined;
    onFilterClick: () => void
}

export const Dashboard: FunctionComponent<DashboardProps> = ({
                                                                 team1,
                                                                 team2,
                                                                 simulationResult,
                                                                 onFilterClick}) => {
    return simulationResult ? (
        <Container>
            <Hidden lgDown>
                <div className={styles.dashboardContent}>
                    <WinPct value={simulationResult.team1WinPct} isMobile={false} />
                    <span>
                        <Image className={styles.teamLogoLarge}
                               width="100"
                               height="100"
                               src={team1.logo}
                               alt=""/>
                        <div>{getTeamStrength(team1.strength)}</div>
                    </span>
                    <span className={styles.vs}>vs</span>
                    <span>
                        <Image className={styles.teamLogoLarge}
                               width="100"
                               height="100"
                               src={team2.logo}
                               alt=""/>
                        <div>{getTeamStrength(team2.strength)}</div>
                    </span>
                    <WinPct value={simulationResult.team2WinPct} isMobile={false} />
                </div>
            </Hidden>

            <Hidden lgUp>
                <div className={styles.flex}>
                    <Button onClick={onFilterClick} variant="contained">
                        <FilterListIcon />
                    </Button>

                    <WinPct isMobile value={simulationResult.team1WinPct} />
                    <span>
                        <Image className={styles.teamLogoMobile}
                               width="50"
                               height="50"
                               src={team1.logo}
                               alt=""/>
                    </span>
                    <span>
                        <Image className={styles.teamLogoMobile}
                               width="50"
                               height="50"
                               src={team2.logo}
                               alt=""/>
                    </span>
                    <WinPct isMobile value={simulationResult.team2WinPct} />



                </div>
            </Hidden>
        </Container>
    ) : <div />
}



/*

 */

/*

 */

export default Dashboard;