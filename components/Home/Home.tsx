import React, {FunctionComponent} from "react";

import styles from '@/styles/Homepage.module.css'
import Image from "next/image";
import Skills from "@/components/Home/Skills";
import Link from "next/link";
import {Box, Container, Hidden} from "@mui/material";

const Home: FunctionComponent = () => {
    return (
        <div className={styles.homePage}>
            <Container>
                <div className={styles.homepageBanner}>
                    <h4>Hi, I&rsquo;m <span className={styles.colorAlternate}>Mike</span>. What can I help you build?</h4>
                    <Hidden mdUp>
                        <Image src="/images/homepage_main_image2.jpg" width="300" height="300" alt="" />
                    </Hidden>
                    <Hidden mdDown>
                        <Image src="/images/homepage_main_image2.jpg" width="800" height="800" alt="" />
                    </Hidden>
                    <div className={styles.homepageBannerTextContainer}>
                        <h1 className={styles.bigHeader}>WEB DEVELOPER</h1>
                        <p className={styles.bannerTextSmall}>I produce clean UIs for data intensive applications.</p>
                    </div>
                </div>
            </Container>
            <Container>
                <div className={styles.workSample}>
                    <h2 className={styles.smallHeader}>WORK SAMPLE</h2>
                    <div className={styles.workSampleLink}>
                        <Hidden mdUp>
                            <Link className={styles.navLink} href="/march-madness">
                                <Image src="/images/march_madness_dashboard4.png" width="410" height="296" alt="" />
                            </Link>
                        </Hidden>
                        <Hidden mdDown>
                            <Link className={styles.navLink} href="/march-madness">
                                <Image src="/images/march_madness_dashboard4.png" width="820" height="593" alt="" />
                            </Link>
                        </Hidden>
                    </div>
                </div>
            </Container>
            <Container>
                <div className={styles.aboutMe}>
                    <h2 className={styles.smallHeader}>ABOUT ME</h2>
                    <Box display="flex" alignItems="center" justifyContent="center" >
                        <Hidden mdUp>
                            <Image className={styles.profilePicture} src="/images/profile_picture4.jpg" width="200" height="200" alt="" />
                        </Hidden>
                        <Hidden mdDown>
                            <Image className={styles.profilePicture} src="/images/profile_picture4.jpg" width="350" height="350" alt="" />
                        </Hidden>
                        <div>
                            <p className={styles.profileText}>I&rsquo;m a software engineer and father of two based in New York Capital Region. I have ten years of experience building applications for companies including Morgan Stanley and Major League Baseball.</p>
                            <p className={styles.profileText}>My strengths are web application development, dashboards & data visualization, data transformation, analysis, and storage.</p>
                            <p className={styles.profileText}>I received my BA from the University of Vermont in 2011 and my MA from Columbia University in 2012.</p>
                        </div>
                    </Box>
                </div>
            </Container>
            <Container>
                <Skills />
            </Container>
        </div>
    );
}

export default Home;