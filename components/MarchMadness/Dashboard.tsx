import {FunctionComponent} from "react";
import Image from 'next/image';
import {Container, Hidden} from "@mui/material";

import {SimulationResult, Team} from "@/components/MarchMadness/Model";
import WinPct from "@/components/MarchMadness/WinPct";

import styles from '@/styles/MarchMadness.module.css';
import {getTeamStrength} from "@/components/MarchMadness/marchMadness.util";

interface DashboardProps {
    team1: Team;
    team2: Team;
    simulationResult: SimulationResult | null | undefined;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({team1, team2, simulationResult}) => {
    const team1Logo = <Image className={styles.teamLogoLarge}
                             width="100"
                             height="100"
                             src={team1.logo}
                             alt=""/>;

    const team2Logo = <Image className={styles.teamLogoLarge}
                             width="100"
                             height="100"
                             src={team2.logo}
                             alt=""/>;

    return simulationResult ? (
        <Container>
            <Hidden lgDown>
                <div className={styles.dashboardContent}>
                    <WinPct value={simulationResult.team1WinPct} size='lg' />
                    <span>
                        <div>{team1Logo}</div>
                        <div>{getTeamStrength(team1.strength)}</div>
                    </span>
                    <span className={styles.vs}>vs</span>
                    <span>
                        <div>{team2Logo}</div>
                        <div>{getTeamStrength(team2.strength)}</div>
                    </span>
                    <WinPct value={simulationResult.team2WinPct} size='lg' />
                </div>
            </Hidden>

            <Hidden lgUp>
                <div className={styles.mobileDashboardContainer}>
                    <div className={styles.mobileWinPctContainer}>
                        {team1Logo}
                        <WinPct value={simulationResult.team1WinPct} size='sm' />
                    </div>
                    <div className={styles.mobileWinPctContainer}>
                        {team2Logo}
                        <WinPct value={simulationResult.team2WinPct} size='sm' />
                    </div>
                </div>
            </Hidden>
        </Container>
    ) : <div />
}

export default Dashboard;