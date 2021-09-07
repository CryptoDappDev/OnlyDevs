import React, { useEffect, useState } from 'react'

import { useSeaport } from "../../src/seaportContext";
import { OpenSeaAsset } from 'opensea-js/lib/types';

type Nft = {Nft: OpenSeaAsset} | {Nft: null} 

const NftContextProvider = 
React.createContext < {Nft: Nft; setNFT : React.Dispatch<React.SetStateAction<Nft>>} | undefined > (undefined);

export function NftContext({...props}) {

  const {opensea} = useSeaport();
  const [Nft, setNFT] = useState<Nft>({Nft: null});
  const value = {Nft, setNFT}
  
  const [NftTokenId, setNftTokenId] = useState(-1);

	async function getNFT () {

    //Check if the asset requested is already in the state
    if (Nft.Nft?.tokenId === props.tokenId) {
      //console.log("🚀 ~ NFT QUERY ALREADY CALLED")
    } else {

      if (props.openseaAddress === true) {
        
        let asset = await opensea.seaport.api.getAsset({
          tokenAddress: "0x495f947276749Ce646f68AC8c248420045cb7b5e",
          tokenId: props.tokenId
        })
        setNFT({Nft: asset});
      } else {
        let asset = await opensea.seaport.api.getAsset({
          tokenAddress: props.tokenAddress,
          tokenId: props.tokenId
        })
        setNFT({Nft: asset});
      }
    }
	}

	useEffect (() => {

    //console.log("🚀 ~ file: NftContext.tsx ~ line 30 ~ props.tokenId", props);
    //console.log("🚀 ~ file: NftContext.tsx ~ line 30 ~ Before Call NFT", Nft);

    if (isNaN(props.tokenId) || props.tokenId.trim() == "") { 
			//console.log("🚀 ~ Not a Number")
		} else {
			//Check if Info 
      //console.log("🚀 ~ Getting NFT...")
      setNftTokenId(props.tokenId);
			setTimeout(() => {getNFT()},500);
		}

    //console.log("🚀 ~ file: NftContext.tsx ~ line 30 ~ After Call NFT", Nft);

	},[props.tokenId, Nft])
  

  return (
    <NftContextProvider.Provider value={value}>
      {props.children}
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