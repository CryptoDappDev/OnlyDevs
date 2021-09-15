import React, { useEffect, useState } from 'react';
import { NFTConsumer } from './NftContext';

import detectEthereumProvider from '@metamask/detect-provider';
import { useSeaport } from './seaportContext';
import { useMetaMask } from "metamask-react";
import { Order } from 'opensea-js/lib/types';

export function NftConsumer ({...props}) {

  const [isMetaMask, setMetaMask] = useState(false);
  
  useEffect( () => {
    if(window.ethereum?.isMetaMask) {
      console.log("🚀 ~ file: NftConsumerWallet.tsx ~ line 14 ~ NftConsumerWallet ~ isMetaMask!");
      setMetaMask(true);
    }
  },[])

  function MetaMaskConsumer ({...props}) {


    const {Nft} = NFTConsumer();
    const {opensea} = useSeaport();
    const { account } = useMetaMask();

    //Debug Stuff
    useEffect (() => {
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 18 ~ useEffect ~ props", props)
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 18 ~ useEffect ~ NFT", Nft)
    },[props, Nft])


    async function handleClick() {
      //Buying This NFT!
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 45 ~ handleClick ~ Buying Nft!", Nft.Nft)

      //Cast Variables to Any
      let tknID : any = Nft.Nft?.tokenId;
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 28 ~ handleClick ~ tknID", tknID)
      let contractID : any = Nft.Nft?.assetContract.address;
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 30 ~ handleClick ~ contractID", contractID)
      let accountAddress : any = account;
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 32 ~ handleClick ~ accountAddress", accountAddress)

      //Check for Orders
      try {
        const {orders, count} = await opensea.seaport.api.getOrders({
          token_id: tknID,
          asset_contract_address: contractID,
          limit: 1,
          bundled: false,
          include_invalid: false,
          offset: 0,
        });
        //console.log("🚀 ~ file: NftConsumer.tsx ~ line 38 ~ handleClick ~ Nft Order", orders);
        //console.log("🚀 ~ file: NftConsumer.tsx ~ line 38 ~ handleClick ~ Nft Attempting Order...");
        await opensea.seaport.fulfillOrder({ order:orders[0], accountAddress });
      } catch(error) {
        //Print Any Errors to Dev Console
        setTimeout(() => console.log( "🚀 ~ " + error), 3000); 
      }
    }

    return (
      <div className={props.className}>
        {(props.name) && <>{Nft.Nft?.name}</> }
        {(props.image) && 
            <img src={Nft.Nft?.imageUrl} style={{objectFit:props.fit}} width="100%" height="100%"></img> 
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
        {(props.buy) && <div onClick={handleClick}> {props.children} </div> }
        {(props.owner) && <> {Nft.Nft?.owner} </> }
      </div>
    );
  }

  return (
    <>
      {(isMetaMask === true) &&
        <MetaMaskConsumer {...props}/>
      }
    </>
  )
}
