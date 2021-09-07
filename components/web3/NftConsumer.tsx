import React, { useEffect } from 'react';
import { NFTConsumer } from './NftContext';


export function NftConsumer ({...props}) {

	const {Nft} = NFTConsumer();
	
	useEffect (() => {

		//console.log("🚀 ~ file: NftConsumer.tsx ~ line 18 ~ useEffect ~ props", props)
    //console.log("🚀 ~ file: NftConsumer.tsx ~ line 18 ~ useEffect ~ NFT", Nft)

	},[props, Nft])

  /*
  {  NFT.asset === null &&
				<Skeleton style={{objectFit:props.fit}} width="100%" height="100%" />
			}{ NFT.asset !== null &&
				NFT.asset?.name
			}
  */

	return (
		<div className={props.className}>
      {(props.name) && <>{Nft.Nft?.name}</> }
      {(props.image) && 
          <img src={Nft.Nft?.imageUrl}></img> 
      }
      {(props.thumbnail) && 
        <img src={Nft.Nft?.imageUrlThumbnail}></img>
      }
      {(props.description) && <>{Nft.Nft?.description}</> }
      {(props.collectionName) && <>{Nft.Nft?.collection.name}</> }
      {(props.collectionDescription) && <>{Nft.Nft?.collection.description}</> }
      {(props.externalLink) && 
          <a href={Nft.Nft?.externalLink}>
            {props.children}
          </a>
      }
      {(props.contract) && <>{Nft.Nft?.tokenAddress}</> }
      {(props.tokenId) && <>{Nft.Nft?.tokenId}</> }
      {(props.numberOfSales) && <>{Nft.Nft?.numSales}</> }
		</div>
	);
}
