import {FunctionComponent} from "react";
import Image from 'next/image';
import { useSpring, animated } from 'react-spring';
import {Container, Hidden} from "@mui/material";

import {SimulationResult, Team} from "@/components/MarchMadness/Model";
import {getWinPctColor, getWinPctWidth} from "@/components/MarchMadness/marchMadness.util";
import WinPct from "@/components/MarchMadness/WinPct";

import styles from '@/styles/MarchMadness.module.css';

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
                    {team1Logo}
                    <span className={styles.vs}>vs</span>
                    {team2Logo}
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