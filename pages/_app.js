import React from 'react'
import '../styles/globals.css'
import { PlasmicRootProvider } from "@plasmicapp/loader"
import { ParallaxProvider } from 'react-scroll-parallax';
import Head from "next/head";


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link rel="preload"
            href="/fonts/Objectivity-Black.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-BlackSlanted.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-Bold.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-BlackSlanted.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-ExtraBold.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-ExtraBoldSlanted.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-Light.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-LightSlanted.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-Medium.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-MediumSlanted.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-Regular.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-RegularSlanted.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-Super.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-SuperSlanted.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-Thin.ttf"
            as="font" crossOrigin="" 
          />
        <link rel="preload"
            href="/fonts/Objectivity-ThinSlanted.ttf"
            as="font" crossOrigin="" 
          />       
        
      </Head>
        <ParallaxProvider>
          <PlasmicRootProvider>
            <Component {...pageProps} />
          </PlasmicRootProvider>
        </ParallaxProvider>
    </div>
  )
     
}

export default MyApp