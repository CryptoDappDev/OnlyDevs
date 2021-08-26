import React from 'react'
import '../styles/globals.css'
import { PlasmicRootProvider } from "@plasmicapp/loader"
import { ParallaxProvider } from 'react-scroll-parallax';
import Head from "next/head";


function MyApp({ Component, pageProps }) {
  return (
    <div>

        <ParallaxProvider>
          <PlasmicRootProvider>
            <Component {...pageProps} />
          </PlasmicRootProvider>
        </ParallaxProvider>
    </div>
  )
     
}

export default MyApp