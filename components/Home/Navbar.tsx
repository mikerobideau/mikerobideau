import React, {FunctionComponent} from "react";
import Link from "next/link";
import {Container} from "@mui/material";

import styles from '@/styles/Home.module.css'

const Navbar: FunctionComponent = () => {
    return (
        <Container>
            <div className={styles.navbar}>
                <Link className={styles.navLink} href="/">Home</Link>
                <Link className={styles.navLink} href="/march-madness">Work Sample</Link>
                <a href='assets/Mike_Robideau_Resume.pdf' className={styles.navLink} download>Resume</a>
            </div>
        </Container>
    )
}

export default Navbar;