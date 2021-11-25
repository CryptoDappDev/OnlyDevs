import * as React from "react";
import { useEffect, useState } from 'react';
import { PlasmicCanvasHost } from "@plasmicapp/loader-nextjs";
import Head from "next/head";
import "../init";
import { GetStaticProps } from "next";

const DBProvider = 
React.createContext < {DBLoginInfo: any; setDBLoginInfo : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);

const OpenSeaKeyProvider = 
React.createContext < {OpenSeaKey: any; setOpenSeaKey : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);

/**
 * For Host, getStaticProps to get API keys for Plasmic Client
 */
 export const getStaticProps: GetStaticProps = async (context) => {

  //Pull Environment Env Variables for API Access
  //This is for Protection of sensitive variables
  let key : any = process.env.DB_SECRET_ACCESS_KEY;
  let id : any = process.env.DB_ACCESS_KEY_ID; 
  const DBLoginInfoProp = {key, id};

  //Open Sea API Env Variable
  let OpenSeaKeyProp : any = process.env.OPENSEA_ACCESS_KEY;

  //console.log("🚀 ~ OPENSEA KEY:", OpenSeaKeyProp);
    
  return {
    props: { DBLoginInfoProp, OpenSeaKeyProp },
  }
};

function Host(props: {
  DBLoginInfoProp?: any;
  OpenSeaKeyProp? : any;
}) {

    //Database Info
    const [DBLoginInfo, setDBLoginInfo] = useState(props.DBLoginInfoProp);

    //Opensea Info
    const [OpenSeaKey, setOpenSeaKey] = useState(props.OpenSeaKeyProp);

  
    //Context Provider Values
    const value_DB = { DBLoginInfo, setDBLoginInfo };
    const value_OpenseaKey = { OpenSeaKey, setOpenSeaKey };
  
    //Debug
    //console.log("🚀 ~ AWS KEYS HOST:", DBLoginInfo);
    //console.log("🚀 ~ OPENSEA KEY HOST:", OpenSeaKey);

  return (
    <DBProvider.Provider value={value_DB}>
      <OpenSeaKeyProvider.Provider value={value_OpenseaKey}>
      <div>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
          !function(){const n=window,i="__REACT_DEVTOOLS_GLOBAL_HOOK__",o="__PlasmicPreambleVersion",t=function(){}
  if(void 0!==n){if(n.parent!==n)try{n[i]=n.parent[i]}catch(e){}if(!n[i]){const r=new Map
  n[i]={supportsFiber:!0,renderers:r,inject:function(n){r.set(r.size+1,n)},onCommitFiberRoot:t,onCommitFiberUnmount:t}}n[i][o]||(n[i][o]="1")}}()`,
            }}
          ></script>
          <link
            href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
            rel="stylesheet"
          />
        </Head>
        
            <PlasmicCanvasHost/>
          
        </div>
      </OpenSeaKeyProvider.Provider>
    </DBProvider.Provider>
  );
}

export default Host;

export function useOpenSeaKeyContextHost() {
  const context = React.useContext(OpenSeaKeyProvider);
  //console.log("🚀 ~ OPENSEA KEY:", OpenSeaKeyProvider);
  if (context === undefined) {
    throw ('An Unexpected Error occured while we tried to connect to openSea HOST... Please Try Again');
  }
  return context
}

export function useDBContextHost() {
  const context = React.useContext(DBProvider);
  if (context === undefined) {
    throw ('An Unexpected Error occured while we tried to connect... Please Refresh');
  }
  return context
}

