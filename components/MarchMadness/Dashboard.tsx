import {FunctionComponent} from "react";
import Image from 'next/image';

import {SimulationResult, Team} from "@/components/MarchMadness/Model";

import styles from '@/styles/MarchMadness.module.css';
import {Container} from "@mui/material";

interface DashboardProps {
    team1: Team;
    team2: Team;
    simulationResult: SimulationResult | null | undefined;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({team1, team2, simulationResult}) => {
    console.log(team1);

    return simulationResult ? (
        <Container>
            <div className={styles.dashboardContent}>
                <span className={styles.winPct}>{simulationResult.team1WinPct}</span>
                <Image className={styles.teamLogoLarge}
                       width="100"
                       height="100"
                       src={team1.logo}
                       alt=""/>
                <span className={styles.vs}>vs</span>
                <Image className={styles.teamLogoLarge}
                       width="100"
                       height="100"
                       src={team2.logo}
                       alt=""/>
                <span className={styles.winPct}>{simulationResult.team2WinPct}</span>
            </div>
        </Container>
    ) : <div />
}

/*

 */

export default Dashboard;