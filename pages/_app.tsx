import React, { useEffect, useState } from "react";
import Head from "next/head";
import "../styles/globals.css";
import "antd/dist/antd.css";
import "react-vis/dist/style.css";
import { ParallaxProvider } from "react-scroll-parallax";
import { AppProps } from "next/app";

import { NextPageContext } from 'next'
import { CountProvider } from "../src/testContext";
import { SeaportProvider} from "../components/web3/seaportContext";
import { MetaMaskProvider } from "metamask-react";
import * as Web3 from 'web3'

function MyApp({ Component, pageProps }: AppProps) {

  const [meta, setMeta] = useState(false);

  useEffect ( () => {
    if (typeof window.ethereum === 'undefined') {
      //console.log("🚀 ~ window.ethereum is available... Using Injected Web3 Provider");
      setMeta(true);
    } else {
      //console.log("🚀 ~ Oops, `window.ethereum` is not defined... No Web3 Hooks will be used...");
    }
  },[])

  return (
    <div>
      <Head>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA3XOn42g_kW2DDuVgwsZ-Q2jdrRbAvzY"
          type="text/javascript"
          key="maps"
        ></script>
        
      </Head>
      {meta && 
        <MetaMaskProvider>
          <SeaportProvider>
            <CountProvider>
              <ParallaxProvider>
                <Component {...pageProps} />
              </ParallaxProvider>
            </CountProvider>
          </SeaportProvider>
        </MetaMaskProvider>
      }
      <MetaMaskProvider>
        <SeaportProvider>
          <CountProvider>
            <ParallaxProvider>
              <Component {...pageProps} />
            </ParallaxProvider>
          </CountProvider>
        </SeaportProvider>
      </MetaMaskProvider>
    </div>
  );
}
export default MyApp;