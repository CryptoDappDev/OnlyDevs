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

import '../styles/order.css';

const PageTitleProvider = 
React.createContext < {PageTitle: any; setPageTitle : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);

function MyApp({ Component, pageProps }: AppProps) {

  const [meta, setMeta] = useState(false);

  const [PageTitle, setPageTitle] = useState<any>("Home | OnlyMemes ❌");
  const PageContextObj = { PageTitle, setPageTitle };

  useEffect ( () => {

    //console.log("🚀 ~ Environment Variables (ID) ~ ", pageProps);

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
        <title> {PageTitle} </title>
      </Head>

      <PageTitleProvider.Provider value={PageContextObj}>
        <MetaMaskProvider>
          <SeaportProvider>
            <CountProvider>
              <ParallaxProvider>
                <Component {...pageProps} />
              </ParallaxProvider>
            </CountProvider>
          </SeaportProvider>
        </MetaMaskProvider>
      </PageTitleProvider.Provider>
    </div>
  );
}

export async function getStaticProps() {

  //let TestDB = process.env.DB_ACCESS_KEY_ID;
  
  //console.log("🚀 ~ Environment Variables (ID) ~ ", process.env.DB_ACCESS_KEY_ID);
  //console.log("🚀 ~ Environment Variables (KEY) ~ ", process.env.DB_SECRET_ACCESS_KEY);
}

export default MyApp;

export function usePageTitleContext() {
  const context = React.useContext(PageTitleProvider);
  if (context === undefined) {
    throw new Error('An Unexpected Error occured while we tried to render the Page Title... Please Refresh');
  }
  return context
}