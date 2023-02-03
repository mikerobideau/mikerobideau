import React, {FunctionComponent} from "react";

import styles from '@/styles/Home.module.css'
import Image from "next/image";
import Skills from "@/components/Home/Skills";
import Link from "next/link";

const Home: FunctionComponent = () => {
    return (
        <div>
            <div className={styles.jumbotron}>
                <h4>Hi, I'm <span className={styles.colorAlternate}>Mike</span>.  What can I help you build?</h4>
                <div className={styles.homepageBanner}>
                    <div className={styles.homepageBannerTextContainer}>
                        <h1 className={styles.bigHeader}>WEB DEVELOPER</h1>
                        <p className={styles.profileText}>I produce clean UIs for data intensive applications.</p>
                    </div>
                    <Image src="/images/homepage_main_image2.jpg" width="700" height="700" alt="" />
                </div>
            </div>
            <div className={styles.workSample}>
                <h2 className={styles.smallHeader}>Work Sample</h2>
                <Link className={styles.navLink} href="/march-madness">
                    <Image src="/images/march_madness_dashboard4.png" width="820" height="593" alt="" />
                </Link>
            </div>
            <div className={styles.jumbotron}>
                <h2 className={styles.smallHeader}>About Me</h2>
                <div className={styles.profile}>
                    <Image className={styles.profilePicture} src="/images/profile_picture4.jpg" width="350" height="350" alt="" />
                    <div>
                        <p className={styles.profileText}>I'm a software engineer and father of two based in New York Capital Region.  I have ten years of experience building applications for companies including Morgan Stanley and Major League Baseball.</p>
                        <p className={styles.profileText}>My strengths are web application development, dashboards & data visualization, data transformation, analysis, and storage.</p>
                        <p className={styles.profileText}>I received my BA from the University of Vermont in 2011 and my MA from Columbia University in 2012.</p>
                    </div>

                </div>
            </div>
            <div className={styles.jumbotron}>
                <Skills />
            </div>
        </div>
    );
}

export default Home;