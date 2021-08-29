import React from 'react'
import '../styles/globals.css'
import { PlasmicRootProvider } from "@plasmicapp/loader"
import { ParallaxProvider } from 'react-scroll-parallax';
import Head from "next/head";

import { CountProvider } from "../src/testContext";
import { SeaportProvider} from "../src/seaportContext";


function MyApp({ Component, pageProps }) {
  return (
    <SeaportProvider>
      <CountProvider>
        <ParallaxProvider>
          <PlasmicRootProvider>
            <Component {...pageProps} />
          </PlasmicRootProvider>
        </ParallaxProvider>
      </CountProvider>
    </SeaportProvider>
  )
     
}

export default MyApp