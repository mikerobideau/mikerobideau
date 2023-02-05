import {FunctionComponent} from "react";
import Image from 'next/image'

import styles from '@/styles/Home.module.css'
import {Container} from "@mui/material";

const Skills: FunctionComponent = () => {
    return (
        <Container>
            <div className={styles.skills}>
                <Image className={styles.skill} src="/images/react3.png" width="100" height="50" alt="" />
                <Image className={styles.skill} src="/images/html css3.png" width="100" height="50" alt="" />
                <Image className={styles.skill} src="/images/spring2.png" width="100" height="50" alt="" />
                <Image className={styles.skill} src="/images/r3.png" width="50" height="50" alt="" />
            </div>
        </Container>
    );
}

export default Skills;