import {FunctionComponent} from "react";
import {animated, useSpring} from "react-spring";
import {getWinPctColor, getWinPctWidth, isLargeScreenSize} from "@/components/MarchMadness/marchMadness.util";
import styles from "@/styles/MarchMadness.module.css";
import {ScreenSize} from "@/components/MarchMadness/Model";

interface WinPctProps {
    value: number;
    size: ScreenSize
}

const WinPct: FunctionComponent<WinPctProps> = ({value, size}) => {
    const spring = useSpring({
        value,
        width: getWinPctWidth(value, size),
        backgroundColor: getWinPctColor(value)
    });

    return (
        <div className={`${styles.winPctContainer} ${isLargeScreenSize(size) ? styles.winPctContainerLarge : styles.winPctContainerSmall}`}>
            <div className={styles.winPctFillContainer}>
                <animated.div className={styles.winPctFill} style={spring}/>
            </div>
            <animated.span className={`${styles.winPct} ${isLargeScreenSize(size) ? styles.winPctLarge : styles.winPctSmall}`}>
                {spring.value.interpolate(x => `${Math.round(x)}%`)}
            </animated.span>
        </div>
    )
}

export default WinPct;