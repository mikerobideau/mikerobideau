import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect } from "react";
import {AppProps} from "next/app";
import Navbar from "@/components/Home/Navbar";

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
      <div>
        <Navbar />
        <Component {...pageProps} />;
      </div>
  )}