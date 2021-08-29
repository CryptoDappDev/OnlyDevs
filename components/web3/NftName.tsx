import React, { useEffect, useState } from 'react';

import { useSeaport } from "../../src/seaportContext";
import { OpenSeaAsset } from 'opensea-js/lib/types';
import Skeleton from '@material-ui/lab/Skeleton';


export function NftName ({...props}) {

	const {opensea} = useSeaport();
	const [NFT, setNFT] = useState<{asset: null | OpenSeaAsset}>({ asset: null});

	async function getNFT () {
		if (props.openseaAddress === true) {
			let asset = await opensea.seaport.api.getAsset({
				tokenAddress: "0x495f947276749Ce646f68AC8c248420045cb7b5e",
				tokenId: props.tokenId
			})
			setNFT(prevState => ({ ...prevState, asset }));
		} else {
			let asset = await opensea.seaport.api.getAsset({
				tokenAddress: props.tokenAddress,
				tokenId: props.tokenId
			})
			setNFT(prevState => ({ ...prevState, asset }));
		}
	}
	
	useEffect (() => {
		//console.log("🚀 ~ file: NftAsset.tsx ~ line 34 ~ useEffect ~ props", props)
		//console.log("🚀 ~ file: NftAsset.tsx ~ line 34 ~ useEffect ~ NFT", NFT.asset)
		//Check if Parameters are set up then call API
		if ((isNaN(props.tokenId))){
			console.log("🚀 ~ Not a Number")
		} else {
			setTimeout(() => {getNFT()},500);
		}
	},[props.tokenId])

	return (
		<div className={props.className}>
			{  NFT.asset === null &&
				<Skeleton style={{objectFit:props.fit}} width="100%" height="100%" />
			}{ NFT.asset !== null &&
				NFT.asset?.name
			}
		</div>
	);
}
