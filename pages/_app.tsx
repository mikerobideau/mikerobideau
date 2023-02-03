import React from "react";
import {AppProps} from "next/app";

import Navbar from "@/components/Home/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {

  return (
      <div>
          <Navbar />
          <Component {...pageProps} />
      </div>
  )}