import React, {FunctionComponent} from "react";
import Jumbotron from "@/components/Home/Jumbotron";

import styles from '@/styles/Home.module.css'

const Home: FunctionComponent = () => {
    return (
        <div className={styles.homePage}>
            <Jumbotron />
        </div>
    )
}

export default Home;