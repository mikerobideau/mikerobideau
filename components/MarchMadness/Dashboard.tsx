import {FunctionComponent} from "react";
import Image from 'next/image';
import { useSpring, animated } from 'react-spring';
import {Container, Hidden} from "@mui/material";

import {SimulationResult, Team} from "@/components/MarchMadness/Model";

import styles from '@/styles/MarchMadness.module.css';
import {getWinPctColor, getWinPctWidth} from "@/components/MarchMadness/marchMadness.util";

interface DashboardProps {
    team1: Team;
    team2: Team;
    simulationResult: SimulationResult | null | undefined;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({team1, team2, simulationResult}) => {
    const team1Spring = useSpring({
        winPct: simulationResult?.team1WinPct || 0,
        width: getWinPctWidth(simulationResult?.team1WinPct),
        backgroundColor: getWinPctColor(simulationResult?.team1WinPct)
    });

    const team2Spring = useSpring({
        winPct: simulationResult?.team2WinPct || 0,
        width: getWinPctWidth(simulationResult?.team2WinPct),
        backgroundColor: getWinPctColor(simulationResult?.team2WinPct)
    });

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
                    <div className={styles.winPctContainer}>
                        <div className={styles.winPctFillContainer}>
                            <animated.div className={styles.winPctFill} style={team1Spring}/>
                        </div>
                        <animated.span className={styles.winPct}>
                            {team1Spring.winPct.interpolate(x => `${Math.round(x)}%`)}
                        </animated.span>
                    </div>
                    {team1Logo}
                    <span className={styles.vs}>vs</span>
                    {team2Logo}
                    <div className={styles.winPctContainer}>
                        <div className={styles.winPctFillContainer}>
                            <animated.div className={styles.winPctFill} style={team2Spring}/>
                        </div>
                        <animated.span className={styles.winPct}>
                            {team2Spring.winPct.interpolate(x => `${Math.round(x)}%`)}
                        </animated.span>
                    </div>
                </div>
            </Hidden>

            <Hidden lgUp>
                <div className={styles.mobileDashboardContainer}>
                    <div className={styles.mobileWinPctContainer}>
                        {team1Logo}
                        <div className={styles.winPctContainer}>
                            <div className={styles.winPctFillContainer}>
                                <animated.div className={styles.winPctFill} style={team1Spring}/>
                            </div>
                            <animated.span className={styles.winPct}>
                                {team1Spring.winPct.interpolate(x => `${Math.round(x)}%`)}
                            </animated.span>
                        </div>
                    </div>
                    <div className={styles.mobileWinPctContainer}>
                        {team2Logo}
                        <div className={styles.winPctContainer}>
                            <div className={styles.winPctFillContainer}>
                                <animated.div className={styles.winPctFill} style={team2Spring}/>
                            </div>
                            <animated.span className={styles.winPct}>
                                {team2Spring.winPct.interpolate(x => `${Math.round(x)}%`)}
                            </animated.span>
                        </div>
                    </div>
                </div>
            </Hidden>
        </Container>
    ) : <div />
}

export default Dashboard;