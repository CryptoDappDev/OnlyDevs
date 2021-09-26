import React, { useEffect, useState } from 'react'

//Nft Context Provider
const NftContextProvider = 
React.createContext < {Nft: string; setNFT : React.Dispatch<React.SetStateAction<string>>} | undefined > (undefined);

//Nft Event Context Provider
const NftEventsContextProvider = 
React.createContext < {Nft_events: string; setNFT_events : React.Dispatch<React.SetStateAction<string>>} | undefined > (undefined);

export function NftContext({...props}) {

  //UseState for Nft Context
  const [Nft, setNFT] = useState("");
  //UseState for Nft Event Context
  const [Nft_events, setNFT_events] = useState("");

  const[Nft_token, setNft_token] = useState("");
  const[Nft_token_Res, setNft_token_Res] = useState("");

  const[Nft_contract, setNft_contract] = useState("");

  
  
  //Context Variables
  const value = {Nft, setNFT};
  const value_events = {Nft_events, setNFT_events};

  /**
   * Gets Nft from OpenSea API using fetch
   * 
   * return: Sets setNFT and setNFT_events for use in the context provider
   * 
   * called: onPageLoad, Nft and props change 
   */
	async function getNFT () {

    //Check if the asset requested is already in the state
    if (Nft_token_Res == Nft_token) {
      //console.log("🚀 ~ NFT QUERY ALREADY SUCESSFULLY CALLED");
    } else {
      //console.log("🚀 ~ NFT QUERY IN PROGRESS....");

      if (props.openseaAddress === true) {

        //API Fetch for OpenSea Asset W/ Opensea Off-Chain Account
        let request = 
        "https://api.opensea.io/api/v1/assets?" + 
        "asset_contract_addresses=" + "0x495f947276749Ce646f68AC8c248420045cb7b5e" +
        "&format=json&limit=1&offset=0&order_direction=desc" + 
        "&token_ids=" + Nft_token;

        await fetch(request)
        .then(function (response) {
          return response.json();
        })
        .then(function(data) {
          let opensea_response = JSON.parse(JSON.stringify(data));

          
          //Response success/failure handling
          //console.log("🚀  ~ OPENSEA RESPONSE ~ " + JSON.stringify(opensea_response));

          if ( JSON.stringify(opensea_response) == JSON.stringify({"token_ids":{"0":["value is not a valid integer"]}}) ) {
            console.log("🚀  ~ OPENSEA RESPONSE NONE FOUND");
            setNFT("");
          }
          else if ( JSON.stringify(opensea_response) == JSON.stringify({"detail":"Request was throttled."}) ) {
            //console.log("🚀  ~ OPENSEA RESPONSE THROTTLED FOUND");
            setNFT("");
          } else {
            //console.log("🚀  ~ OPENSEA REQUEST SUCCESS");
            //console.log("🚀  ~ OPENSEA RESPONSE tknID: " + opensea_response.assets[0].token_id);
            setNft_token_Res(opensea_response.assets[0].token_id);
            setNFT(opensea_response);
          }
        })

        //API Fetch for OpenSea Asset Event History
        let request_events = 
        "https://api.opensea.io/api/v1/events?" + 
        "asset_contract_address=" + "0x495f947276749Ce646f68AC8c248420045cb7b5e" +
        "&token_id=" + Nft_token +
        "&event_type=transfer&only_opensea=false&offset=0&limit=300";  

        await fetch(request_events)
        .then(function (response) {
          return response.json();
        })
        .then(function(data) {
          let opensea_events = JSON.parse(JSON.stringify(data));
          
          //console.log("🚀  Result EVENTS ~ " + JSON.stringify(opensea_events));
          setNFT_events(opensea_events);

          //If Array is full (300), time to check for more...
          //console.log("🚀  Result 1 SIZE ~ " + opensea_events.asset_events.length);
          /*
          if(opensea_events.asset_events.length === 300) {
            Logic for multiple calls for event lists >300
          }
          */
        })

      } else {
       
        //API Fetch for OpenSea Asset W/o Opensea Off-Chain Account
        let request = 
        "https://api.opensea.io/api/v1/assets?" + 
        "asset_contract_addresses=" + Nft_contract +
        "&format=json&limit=1&offset=0&order_direction=desc" + 
        "&token_ids=" + Nft_token;

        await fetch(request)
        .then(function (response) {
          return response.json();
        })
        .then(function(data) {
          let opensea_response = JSON.parse(JSON.stringify(data));
          //console.log("🚀  ~ OPENSEA RESPONSE ~ " + JSON.stringify(opensea_response));
          
          //Response success/failure handling
          //console.log("🚀  ~ OPENSEA RESPONSE ~ " + JSON.stringify(opensea_response));

          if ( JSON.stringify(opensea_response) == JSON.stringify({"token_ids":{"0":["value is not a valid integer"]}}) ) {
            console.log("🚀  ~ OPENSEA RESPONSE NONE FOUND");
            setNFT("");
          }
          else if ( JSON.stringify(opensea_response) == JSON.stringify({"detail":"Request was throttled."}) ) {
            console.log("🚀  ~ OPENSEA RESPONSE THROTTLED FOUND");
            setNFT("");
          } else {
            console.log("🚀  ~ OPENSEA REQUEST SUCCESS");
            console.log("🚀  ~ OPENSEA RESPONSE tknID: " + opensea_response.assets[0].token_id);
            setNft_token_Res(opensea_response.assets[0].token_id);
            setNFT(opensea_response);
          }

        })

        //API Fetch for OpenSea Asset Event History W/o Opensea Off-Chain Account
        let request_events = 
        "https://api.opensea.io/api/v1/events?" + 
        "asset_contract_address=" + Nft_contract +
        "&token_id=" + Nft_token +
        "&event_type=transfer&only_opensea=false&offset=0&limit=300";  

        await fetch(request_events)
        .then(function (response) {
          return response.json();
        })
        .then(function(data) {
          let opensea_events = JSON.parse(JSON.stringify(data));
          //console.log("🚀  Result EVENTS ~ " + JSON.stringify(opensea_events));
          setNFT_events(opensea_events);

          //If Array is full (300), time to check for more...
          //console.log("🚀  Result 1 SIZE ~ " + opensea_events.asset_events.length);
          /*
          if(opensea_events.asset_events.length === 300) {
            Logic for multiple calls for event lists >300
          }
          */
        })        
      }
    }
	}

	useEffect (() => {

    //console.log("🚀 ~ file: NftContext.tsx ~ line 30 ~ props.tokenId", props);
    //console.log("🚀 ~ file: NftContext.tsx ~ line 30 ~ Before Call NFT", Nft);

    if ((isNaN(props.tokenId)) || (props.tokenId.trim() === "")) { 
			//console.log("🚀 ~ Not a Number")
		} else {
      //console.log("🚀 ~ Getting NFT...")
      if(props.openseaAddress == true) {
        setNft_contract(props.tokenAddress);
      } 
      setNft_token(props.tokenId);
			setTimeout(() => {getNFT()},250);
		}

    //console.log("🚀 ~ file: NftContext.tsx ~ line 30 ~ After Call NFT", Nft);

	},[props])
  

  return (
    <NftContextProvider.Provider value={value}>
      <NftEventsContextProvider.Provider value={value_events}>
      {props.children}
      </NftEventsContextProvider.Provider>
    </NftContextProvider.Provider>
  )
}

export function NFTConsumer() {
  const context = React.useContext(NftContextProvider)
  if (context === undefined) {
    throw new Error('NftContext must be used within a NftContext Provider')
  }
  return context
}

export function NFTEventsConsumer() {
  const context = React.useContext(NftEventsContextProvider)
  if (context === undefined) {
    throw new Error('NftEventsContext must be used within a NftEventsContext Provider')
  }
  return context
}