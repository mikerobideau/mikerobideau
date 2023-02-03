import Head from 'next/head'
import { Inter } from '@next/font/google'

import Home from "@/components/Home/Home";

import styles from '@/styles/Home.module.css'
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Mike Robideau</title>
        <meta name="description" content="Mike Robideau" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Chilanka&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.main}>
          <Home />
      </main>
    </>
  )
}
