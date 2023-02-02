import React, {FunctionComponent} from "react";
import Image from "next/image";

import styles from "@/styles/Home.module.css";

const Jumbotron: FunctionComponent = () => {
    return (
        <div className={styles.jumbotron}>
            <h1 className={styles.profileHeader}>ABOUT MIKE</h1>
            <div className={styles.profile}>
                <Image className={styles.profilePicture} src="/images/profile_picture4.jpg" width="500" height="500" alt="" />
                <div>
                    <p className={styles.profileText}>Mike is a software engineer and father of two based in New York Capital Region.  He has ten years of experience building applications for companies including Morgan Stanley and Major League Baseball.</p>
                    <p className={styles.profileText}>His expertise includes web applications, dashboards, data transformation, analysis, and storage.</p>
                    <p className={styles.profileText}>Mike received his BA from the University of Vermont in 2011 and his MA from Columbia University in 2012.</p>
                </div>
            </div>
        </div>
    );
}

export default Jumbotron;