import {FunctionComponent} from "react";
import {animated, useSpring} from "react-spring";

import {getWinPctColor, getWinPctWidth} from "@/components/MarchMadness/marchMadness.util";

import styles from "@/styles/MarchMadness.module.css";
import {responsiveClass} from "@/util/mobileUtil";

interface WinPctProps {
    value: number;
    isMobile: boolean;
}

const WinPct: FunctionComponent<WinPctProps> = ({value, isMobile}) => {
    const spring = useSpring({
        value,
        width: getWinPctWidth(value, isMobile),
        backgroundColor: getWinPctColor(value)
    });

    return (
        <div className={responsiveClass(
                isMobile,
                styles.winPctContainer,
                styles.winPctContainerDesktop,
                styles.winPctContainerMobile)}>
            <div className={responsiveClass(
                isMobile,
                styles.winPctFillContainer,
                styles.winPctFillContainerDesktop,
                styles.winPctContainerMobile)}>
                <animated.div style={spring} className={responsiveClass(
                    isMobile,
                    styles.winPctFill,
                    styles.winPctFillDesktop,
                    styles.winPctFillMobile)} />
            </div>
            <animated.span className={responsiveClass(
                isMobile,
                styles.winPctText,
                styles.winPctTextDesktop,
                styles.winPctTextMobile)}>
                {spring.value.interpolate(x => `${Math.round(x)}%`)}
            </animated.span>
        </div>
    );
}

export default WinPct;