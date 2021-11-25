import * as React from "react";
import { useEffect, useState } from 'react';
import {
  PlasmicComponent,
  ComponentRenderData,
  PlasmicRootProvider,
} from "@plasmicapp/loader-nextjs";
import { GetStaticPaths, GetStaticProps } from "next";
import { PLASMIC } from "../init";
import Error from "next/error";
import { useOpenSeaKeyContextHost } from "./host";

const PageContextProvider = 
React.createContext < {pageData: any; setPageData : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);

const DBProvider = 
React.createContext < {DBLoginInfo: any; setDBLoginInfo : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);

const OpenSeaKeyProvider = 
React.createContext < {OpenSeaKey: any; setOpenSeaKey : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);

/**
 * Use fetchPages() to fetch list of pages that have been created in Plasmic
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await PLASMIC.fetchPages();
  return {
    paths: pages.map((page) => ({
      params: { catchall: page.path.substring(1).split("/") },
    })),
    fallback: false,
  };
};

/**
 * For each page, pre-fetch the data we need to render it
 */
export const getStaticProps: GetStaticProps = async (context) => {
  const { catchall } = context.params ?? {};

  //Pull Environment Env Variables for API Access
  //This is for Protection of sensitive variables
  let key : any = process.env.DB_SECRET_ACCESS_KEY;
  let id : any = process.env.DB_ACCESS_KEY_ID; 
  const DBLoginInfoProp = {key, id};

  //Open Sea API Env Variable
  let OpenSeaKeyProp : any = process.env.OPENSEA_ACCESS_KEY;

  //console.log("🚀 ~ OPENSEA KEY:", OpenSeaKeyProp);
  
  // Convert the catchall param into a path string
  const plasmicPath =
    typeof catchall === "string"
      ? catchall
      : Array.isArray(catchall)
      ? `/${catchall.join("/")}`
      : "/";
  const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath);
  if (plasmicData) {
    // This is a path that Plasmic knows about; pass the data
    // in as props
    
    return {
      props: { plasmicData, DBLoginInfoProp, OpenSeaKeyProp },
    };
  } else {
    // This is some non-Plasmic catch-all page
    return {
      props: {},
    };
  }
};

/**
 * Main Controller Page -> Handling Processes that must take place on all pages
 */
export default function CatchallPage(props: {
  plasmicData?: ComponentRenderData;
  DBLoginInfoProp?: any;
  OpenSeaKeyProp? : any;
}) {
  const { plasmicData } = props;

  //Database Info
  const [DBLoginInfo, setDBLoginInfo] = useState(props.DBLoginInfoProp);

  //Opensea Info
  const [OpenSeaKey, setOpenSeaKey] = useState(props.OpenSeaKeyProp);

  //Search Url Info
  const [pageData, setPageData] = useState(plasmicData?.entryCompMetas[0].name);

  //Context Provider Values
  const value_Page = { pageData, setPageData };
  const value_DB = { DBLoginInfo, setDBLoginInfo };
  const value_OpenseaKey = { OpenSeaKey, setOpenSeaKey };

  //Debug
  //console.log("🚀 ~ AWS KEYS:", DBLoginInfo);
  //console.log("🚀 ~ OPENSEA KEY:", OpenSeaKey);

  if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
    return <Error statusCode={404} />;
  }
  return (
    // Pass in the data fetched in getStaticProps as prefetchedData
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
      <OpenSeaKeyProvider.Provider value={value_OpenseaKey}>
        <DBProvider.Provider value={value_DB}>
          <PageContextProvider.Provider value={value_Page}>

            {
              // plasmicData.entryCompMetas[0].name contains the name
              // of the component you fetched.
            }
            <PlasmicComponent component={plasmicData.entryCompMetas[0].name} />

          </PageContextProvider.Provider>
        </DBProvider.Provider>
      </OpenSeaKeyProvider.Provider>
    </PlasmicRootProvider>
  );
}

export function useOpenSeaKeyContext() {
  const context = React.useContext(OpenSeaKeyProvider);
  //console.log("🚀 ~ OPENSEA KEY:", OpenSeaKeyProvider);
  if (context === undefined) {
    const {OpenSeaKey, setOpenSeaKey} = useOpenSeaKeyContextHost();

    const hostContext = {OpenSeaKey, setOpenSeaKey}
    if ( hostContext === undefined ) {
      throw ('We lost our connection for a second... Please refresh your page so we know it is safe!');
      //throw ('An Unexpected Error occured while we tried to connect to openSea CLIENT... Please Try Again');
    }
    return hostContext
  }
  return context
}

export function useDBContext() {
  const context = React.useContext(DBProvider);
  if (context === undefined) {
    throw ('An Unexpected Error occured while we tried to connect... Please Refresh');
  }
  return context
}

export function usePageDataContext() {
	const context = React.useContext(PageContextProvider);
	//console.log("✅ ~ Page Context After Request Finish ~ ", context);
  
	if (context === undefined) {
    //Development Context
	  //throw('Page Context did not Load, Please Refresh Page!');
    //console.log("🚀 ~ Page Context After Request Finish ~ ", context);
    const [pageData, setPageData] = useState("Dev");
    const value = {pageData, setPageData};
    return value
	} else {
    //Production Context 
    //console.log("🚀 ~ Page Context After Request Finish ~ ", context);
    return context
  }
}


