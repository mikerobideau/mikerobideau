import {FunctionComponent} from "react";
import Image from 'next/image';

import {SimulationResult} from "@/components/MarchMadness/Model";

import {getLogoUrl} from "@/components/MarchMadness/teamLogos.util";

import styles from '@/styles/MarchMadness.module.css';

interface DashboardProps {
    simulationResult: SimulationResult | null | undefined;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({simulationResult}) => {
    return simulationResult ? (
        <div className={styles.dashboard}>

            <span className={`${styles.winPct} ${styles.team1WinPct}`}>{simulationResult.team1WinPct}</span>
            <Image className={styles.team1LogoLarge}
                   width="100"
                   height="100"
                   src={getLogoUrl(simulationResult.team1)}
                   alt=""/>
            <Image className={styles.team2LogoLarge}
                   width="100"
                   height="100"
                   src={getLogoUrl(simulationResult.team2)}
                   alt=""/>
            <span className={`${styles.winPct} ${styles.team2WinPct}`}>{simulationResult.team2WinPct}</span>
        </div>
    ) : <div className={styles.dashboard} />
}

/*

 */

export default Dashboard;