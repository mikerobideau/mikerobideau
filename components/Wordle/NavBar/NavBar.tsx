import {FunctionComponent} from "react";

import styles from '@/components/Wordle/Navbar/navbar.module.css';

const NavBar: FunctionComponent = () => {
    return <div className={styles.navbar}>
        <img className={styles.logo} src="/images/hornet.png" />
        <div className={styles.title}>Wordle</div>
    </div>
};

export default NavBar;