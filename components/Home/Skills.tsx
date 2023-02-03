import {FunctionComponent} from "react";
import Image from 'next/image'

import styles from '@/styles/Home.module.css'

const Skills: FunctionComponent = () => {
    return <div className={styles.skills}>
        <Image className={styles.skill} src="/images/react3.png" width="200" height="100" alt="" />
        <Image className={styles.skill} src="/images/html css3.png" width="200" height="100" alt="" />
        <Image className={styles.skill} src="/images/spring2.png" width="200" height="100" alt="" />
        <Image className={styles.skill} src="/images/r3.png" width="100" height="100" alt="" />
    </div>
}

export default Skills;