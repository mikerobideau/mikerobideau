import "bootstrap/dist/css/bootstrap.min.css";

// commenting this due to as issue with sass and nextjs
// error - unhandledRejection: Error: Cannot find module 'C:\Users\micha\repos\mikerobideau\node_modules\next\dist\compiled\sass-loader/fibers.js'
//import "../styles/globals.css";

import { useEffect } from "react";
import {AppProps} from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />;
}