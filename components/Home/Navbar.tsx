import React, {FunctionComponent} from "react";
import Link from "next/link";

import styles from '@/styles/Home.module.css'

const Navbar: FunctionComponent = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <Link className={styles.navLink} href="/">Home</Link>
                <Link className={styles.navLink} href="/march-madness">Work Sample</Link>
            </div>
            <div className={styles.navbarMiddle}>
            </div>
            <div className={styles.navbarRight}>
                <a href='assets/Mike_Robideau_Resume.pdf' className={styles.navLink} download>Resume</a>
            </div>
        </div>
    )
}

export default Navbar;