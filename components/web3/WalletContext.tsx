import React, { useEffect, useState, useRef } from 'react';
import { 
  useAccountNftContext, 
  useNFTCacheProvider, 
  useNFTEventCacheProvider, 
  usePageContext, 
  usePageEventContext } 
  from './NftPageContext';

import detectEthereumProvider from '@metamask/detect-provider';
import { useMetaMask } from "metamask-react";

export function WalletContext ({...props}) {

  const [isMetaMask, setMetaMask] = useState(false);
  
  useEffect( () => {
    if(window.ethereum?.isMetaMask) {
      //console.log("🚀 ~ file: NftConsumerWallet.tsx ~ line 14 ~ NftConsumerWallet ~ isMetaMask!");
      setMetaMask(true);
    }
  },[])

  function MetaMaskConsumer ({...props}) {

    //Metamask Hook
    const { status, connect, account } = useMetaMask();

    //Page Context
    const { NftPageContext } = usePageContext();
    const { NftEventPageContext } = usePageEventContext();
    const { AccountNftStack } = useAccountNftContext();
    const { NFTCache } = useNFTCacheProvider();
    const { NFTEventCache } = useNFTEventCacheProvider();

    //UseStates 
    const [ accountName, setAccountName ] = useState("No Name");

    /**
     * Determines what Web3.0 Provider is available to the client
     */
    async function getProvider () {
      try { 
        const provider = await detectEthereumProvider();
        if (window.ethereum?.isMetaMask) {
          //console.log("🚀 ~ window.ethereum is available... Using Injected Web3 Provider");
        //setProviderAvailable(true);
        } else
        {
          //console.log("🚀 ~ Oops, `window.ethereum` is not defined... Using External Web3 Provider");
        }
      } catch (err) {
          //console.log("🚀 ~ Oops, Error in Web3 Provider... Using External Web3 Provider");
        //setProviderAvailable(false);
      }
    }
    
    useEffect (() => {
      getProvider();
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 18 ~ useEffect ~ props", props);
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 18 ~ useEffect ~ account", account);

      
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 18 ~ useEffect ~ NftPageContext", NftPageContext);
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 18 ~ useEffect ~ NftEventPageContext", NftEventPageContext);
      
      let AccountNfts : any = AccountNftStack;

      if(AccountNfts.assets != undefined && NFTEventCache[0] != undefined && NftPageContext[0] != "")
      {
        //Check for updates to Nft Cache -> Look for Beta Tester!!!
        //console.log("🚀 ~ NFTCache: ", NFTCache);
        //console.log("🚀 ~ NFTEventCache: ", NFTEventCache);

        for(let j=0; j<NFTEventCache[0].asset_events.length; j++) {
          
          if(NFTEventCache[0].asset_events[j].to_account.address == "0xb3b222f9a47c1dad79b4318d298def4b07b3b0c1") {
            console.log("🚀 ~ Beta Tester Name ", NFTEventCache[0].asset_events[j].to_account.user.username);
            setAccountName(NFTEventCache[0].asset_events[j].to_account.user.username);
          }
        }

        //console.log("🚀 ~ BETA TESTER LOOKUP");
        //console.log("🚀 ~ BetaTester Lookup: ", AccountNfts.assets.length);

        //This is Harrowyn, a Beta Tester
        //0xb3b222f9a47c1dad79b4318d298def4b07b3b0c1

        //This is merlin_the_coin, a Beta Tetster 
        //0xcb0748a7c6fecfd189c3e140b6a6d84096fe286b


        for(let i=0; i<AccountNfts.assets.length; i++) {
          if (AccountNfts.assets[i].name == "OnlyMemes | Beta-Tester Trading Card") {

            //console.log("🚀 ~ BETA TESTER CARD FOUND IN ACCOUNT: ", AccountNfts.assets[i]);
          }
        }

        /*
        if( (NftReady == "Ready") && (NftLoaded != "Done") ) {

          //console.log("🚀 ~ file: NftConsumer.tsx ~ line 60 ~ useEffect ~ NFT EVENTS Type TEST ~ ", Nft_eventsAnyType.asset_events.length);
          
          //console.log("🚀 ~ NFT should now be loaded: ", NftLoaded);
  
          //console.log("🚀 ~ TEST ~ " + Nft_eventsAnyType.asset_events.length);
  
          //Logic to Determine State Derivatives of this Nft
          //console.log("🚀 ~ file: NftConsumer.tsx ~ line 43 ~ useEffect ~ NFT UPDATE ~ START");
  
          //Loop over all Events Found
          //console.log("🚀 ~ REQUESTED EVENTS: ", JSON.stringify(Nft_eventsAnyType));
          //console.log("🚀 ~ REQUESTED EVENTS: ", Nft_eventsAnyType);
          //console.log("🚀 ~ REQUESTED NFT: ", NftAnyType);
  
          let count : number = Nft_eventsAnyType.asset_events.length;
  
  
  
          let owner : string[] = [];
          let ownerAddress : string[] = [];
          let ownerNumOfAssets : number[] = [];
          let ownerImage : string[] = [];
          let numOwners : number = 0;
  
          //Loop through all events on this Nft and extract State Derivaties
          for(let i=0; i < count; i++) {
            //console.log("🚀 ~ EVENT LOOP " + i);
  
            //console.log("🚀 ~ EVENT LOOP TRANSFER QUANTITY " + Nft_eventsAnyType.asset_events[i].quantity);
  
            //First Owner Event, Always put in Array position 1
            if( numOwners < 1 ) {
              
              if ((Nft_eventsAnyType.asset_events[i].to_account.user === null) || (Nft_eventsAnyType.asset_events[i].to_account.user.username === null)) {
                owner[0] = "Anonymous";
                //console.log("🚀 ~ TESTING FIRST OWNER ADDRESS EVENT " + owner[0]);
              } else { 
                owner[0] = Nft_eventsAnyType.asset_events[i].to_account.user.username 
                //console.log("🚀 ~ TESTING FIRST OWNER ADDRESS EVENT " + owner[0]);
              }
              
              //console.log("🚀 ~ TESTING FIRST OWNER ADDRESS EVENT " + ownerAddress[0]);
              ownerAddress[0] = Nft_eventsAnyType.asset_events[i].to_account.address;
  
  
              //Increment ownerNumOfAssets of first owner by quantity
              ownerNumOfAssets[0] = 0;
              ownerNumOfAssets[0] = +ownerNumOfAssets[0] + +Nft_eventsAnyType.asset_events[i].quantity;
  
              //Set owner Image 
              ownerImage[0] = Nft_eventsAnyType.asset_events[i].to_account.profile_img_url;
  
              //Increment Owners by 1 -> it always starts as 0, now its 1, the next position availble in the array 
              numOwners++;
  
            //Additional Owners requires for loop to check for duplicates
            } else {
              //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT " + i);
  
              //Account being added / incremented
              //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT ACCOUNT " + Nft_eventsAnyType.asset_events[i].to_account.address);
              
              //Loop through entire owner list and try to find owner
              let newusr : boolean = true;
  
              for (let m=0; m<numOwners; m++) {
  
                if((ownerAddress[m] ===  Nft_eventsAnyType.asset_events[i].to_account.address) && (newusr === true)) {
                  //This person already owns one of these, Increment ownerNumOfAssets
                  //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT DUPLICATE FOUND");
                  //console.log("🚀 ~ TESTING PROVIDER EVENT BEFORE QUANTITY: " + ownerNumOfAssets[m]);
                  let tmp : number = Nft_eventsAnyType.asset_events[i].quantity;
                  if (tmp > 1) {
                    ownerNumOfAssets[m] = +ownerNumOfAssets[m] + +tmp;
                  } else {
                    ownerNumOfAssets[m] = ownerNumOfAssets[m] + 1;
                  }
                  //console.log("🚀 ~ TESTING PROVIDER EVENT AFTER QUANTITY: " + ownerNumOfAssets[m]);
  
                  //Set newusr to false!!
                  newusr = false;
  
                } 
              }
              //If we didnt find a previous owner then this is a new owner
              if (newusr === true) {
                //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT NO DUPLICATE FOUND... ADDING NEW USER");
                
                //Adding new user or Anonymous owner
                if ((Nft_eventsAnyType.asset_events[i].to_account.user === null) || (Nft_eventsAnyType.asset_events[i].to_account.user.username === null)) {
                  //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT ADD USERNAME " + "Anonymous");
                  owner[numOwners] = "Anonymous"
                } else {
                  //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT ADD USERNAME " + Nft_eventsAnyType.asset_events[i].to_account.user.username);
                  owner[numOwners] = Nft_eventsAnyType.asset_events[i].to_account.user.username;
                }
                
                //Adding new address owner
                //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT ADD ACCOUNT " + Nft_eventsAnyType.asset_events[i].to_account.address);
                ownerAddress[numOwners] = Nft_eventsAnyType.asset_events[i].to_account.address;
  
                //Increment number of assets
                ownerNumOfAssets[numOwners] = 0;
                let tmp : number = Nft_eventsAnyType.asset_events[i].quantity
                if (tmp > 1) {
                  ownerNumOfAssets[numOwners] = +ownerNumOfAssets[numOwners] + +tmp;
                } else {
                  ownerNumOfAssets[numOwners] = ownerNumOfAssets[numOwners] + 1;
                }
  
                //Set Profile Pic
                ownerImage[numOwners] = Nft_eventsAnyType.asset_events[i].to_account.profile_img_url;
                
  
                //Increment number of owners
                numOwners++;
                
              }
            }      
            
            //Provider 
            
            //Check if Provider is an owner, if not add them, then decrement their ownsership by one
            //console.log("🚀 ~ TESTING PROVIDER ADDRESS EVENT " + JSON.stringify(Nft_eventsAnyType.asset_events[i].from_account));
            
            //Loop through entire owner list and try to find Provider
            let newusrProvider : boolean = true;
            for (let x=0; x<numOwners; x++) {
  
              if((ownerAddress[x] ===  Nft_eventsAnyType.asset_events[i].from_account.address) && (newusrProvider === true)) {
                //This person already owns one of these, Increment ownerNumOfAssets
                //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT DUPLICATE FOUND");
                
                //Check if from Null address, then dont decrement
                //console.log("🚀 ~ TESTING PROVIDER EVENT ADDRESS: " + Nft_eventsAnyType.asset_events[i].from_account.address);
                
                if(Nft_eventsAnyType.asset_events[i].from_account.address == "0x0000000000000000000000000000000000000000") {
                  //console.log("🚀 ~ OWNER EVENT NULL ADDRESS FOUND");
                } else {
                  let tmp : number = Nft_eventsAnyType.asset_events[i].quantity;
                  ownerNumOfAssets[x] = +ownerNumOfAssets[x] - +tmp;
                }
  
                //Set newusr to false!!
                newusrProvider = false;
  
              } 
            }
  
            //If we didnt find a previous owner then this is a new owner
            if (newusrProvider === true) {
              //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT NO DUPLICATE FOUND... ADDING NEW USER");
              
              //Adding new user or Anonymous owner
              if ((Nft_eventsAnyType.asset_events[i].from_account.user === null) || (Nft_eventsAnyType.asset_events[i].from_account.user.username === null)) {
                //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT ADD USERNAME " + "Anonymous");
                owner[numOwners] = "Anonymous"
              } else {
                //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT ADD USERNAME " + Nft_eventsAnyType.asset_events[i].to_account.user.username);
                owner[numOwners] = Nft_eventsAnyType.asset_events[i].from_account.user.username;
              }
              
              //Adding new address owner
              //console.log("🚀 ~ TESTING ADDITIONAL OWNERS EVENT ADD ACCOUNT " + Nft_eventsAnyType.asset_events[i].to_account.address);
              ownerAddress[numOwners] = Nft_eventsAnyType.asset_events[i].from_account.address;
  
              //Set profile Pic
              ownerImage[numOwners] = Nft_eventsAnyType.asset_events[i].to_account.profile_img_url;
  
              //Check if from Null address, then dont decrement
              //console.log("🚀 ~ TESTING PROVIDER EVENT ADDRESS: " + Nft_eventsAnyType.asset_events[i].from_account.address);
              //console.log("🚀 ~ TESTING PROVIDER EVENT BEFORE QUANTITY: " + ownerNumOfAssets[numOwners]);
              if(Nft_eventsAnyType.asset_events[i].from_account.address == "0x0000000000000000000000000000000000000000") {
                //console.log("🚀 ~ OWNER EVENT NULL ADDRESS FOUND");
              } else {
                ownerNumOfAssets[numOwners] = 0;
                let tmp : number = Nft_eventsAnyType.asset_events[i].quantity;
                ownerNumOfAssets[numOwners] = +ownerNumOfAssets[numOwners] - +tmp;
              }
  
              //console.log("🚀 ~ TESTING PROVIDER EVENT AFTER QUANTITY: " + ownerNumOfAssets[numOwners]);
  
              //Increment number of owners
              numOwners++;
            }
            
          }
  
          //Sory by Highest Number of assets and delete all non holders (Slow Data Sort)
          for(let p=0; p<numOwners; p++) {
            //Find Largest Holder, Put them first, etc.
            let largestHolder = 0;
            for(let r=p; r<numOwners; r++) {
              if(ownerNumOfAssets[largestHolder] < ownerNumOfAssets[r]) {
                largestHolder = r;
              }
            }
            //Swap Largest Holder for position p
            let tmp_pos_1 = owner[p];
            let tmp_pos_2 = ownerAddress[p];
            let tmp_pos_3 = ownerNumOfAssets[p];
            let tmp_pos_4 = ownerImage[p];
  
            owner[p] = owner[largestHolder];
            ownerAddress[p] = ownerAddress[largestHolder];
            ownerNumOfAssets[p] = ownerNumOfAssets[largestHolder];
            ownerImage[p] = ownerImage[largestHolder];
  
            owner[largestHolder] = tmp_pos_1;
            ownerAddress[largestHolder] = tmp_pos_2;
            ownerNumOfAssets[largestHolder] = tmp_pos_3;
            ownerImage[largestHolder] = tmp_pos_4;
  
          }
  
          //Delete all 0, and undefined values and shift array up
          for(let w=0; w<numOwners; w++) {
            if((ownerNumOfAssets[w] == undefined) ||(ownerNumOfAssets[w] == 0)) {
              //Shift all values up
              for(let z=w; z<numOwners; z++) {
                owner[z] = owner[z+1];
                ownerAddress[z] = ownerAddress[z+1];
                ownerNumOfAssets[z] = ownerNumOfAssets[z+1];
                ownerImage[z] = ownerImage[z+1];
              }
            }
          }
  
          //Remove trailing 0s and undefined stuff
          while((ownerNumOfAssets[owner.length-1] == 0) || (ownerNumOfAssets[owner.length-1] == undefined))
          {
            owner.pop();
            ownerAddress.pop();
            ownerNumOfAssets.pop();
            ownerImage.pop();
            numOwners--;
          }

        }
        */

      } else {
        console.log("🚀 ~ NO ACCOUNT FOUND");
      }
    },[NFTEventCache, account])



    //Complicated Metamsk Logic for Login/Logout
    return (
      <div className={props.className}>

        {( props.login && !props.stateLoggedIn  && !props.stateLoggingIn ) && 
          <> 
            {(status === "notConnected") && <div onClick={() =>connect()}> {props.accountLogin} </div>}
            {(status === "connected") && <> {props.accountLoggedIn} </>}
            {(status === "connecting") && <> {props.accountLoggingIn} </>}   
          </>
        }
        {( props.login && props.stateLoggedIn  && !props.stateLoggingIn ) && 
          
          <> {props.accountLoggedIn} </>
        }
        {( props.login && !props.stateLoggedIn  && props.stateLoggingIn ) && 
          <> 
              <> {props.accountLoggingIn} </>
          </>
        }



        {( props.accountAddress && !props.stateLoggedIn  && !props.stateLoggingIn ) && 
          <> 
            {(status === "notConnected") && <> {props.accountNone} </>}
            {(status === "connected") && <> {account} </>}
            {(status === "connecting") && <> {props.accountLoggingIn} </>}   
          </>
        }
        {( props.accountAddress && props.stateLoggedIn  && !props.stateLoggingIn ) && 

            <>0x5b3256965e7C3cF26E11FCAf296DfC8807C01073</>

        }
        {( props.accountAddress && !props.stateLoggedIn  && props.stateLoggingIn ) && 
          <> 
            {props.accountLoggingIn}
          </>
        }
        


        {( props.accountBalance && !props.stateLoggedIn  && !props.stateLoggingIn ) && 
          <> 
            {(status === "notConnected") && <> {props.accountNone} </>}
            {(status === "connected") && <>69.420</>}
            {(status === "connecting") && <> {props.accountLoggingIn} </>}   
          </>
        }
        {( props.accountBalance && props.stateLoggedIn  && !props.stateLoggingIn ) && 
          <>69.420</>
        }
        {( props.accountBalance && !props.stateLoggedIn  && props.stateLoggingIn ) && 
          <> 
              {props.accountLoggingIn}
          </>
        }



        {( props.accountInfo && !props.stateLoggedIn  && !props.stateLoggingIn ) && 
          <> 
            {(status === "notConnected") && <> {props.accountNone} </>}
            {(status === "connected") && <> {props.accountLoggedIn} </>}
            {(status === "connecting") && <> {props.accountLoggingIn} </>}   
          </>
        }
        {( props.accountInfo && props.stateLoggedIn  && !props.stateLoggingIn ) && 
          <> 
            {props.accountLoggedIn} 
          </>
        }
        {( props.accountInfo && !props.stateLoggedIn  && props.stateLoggingIn ) && 
          <> 
              {props.accountLoggingIn}
          </>
        }      



        {( props.accountName && !props.stateLoggedIn  && !props.stateLoggingIn ) && 
          <> 
            {(status === "notConnected") && <> {props.accountNone} </>}
            {(status === "connected") && <> {accountName} </>}
            {(status === "connecting") && <> {props.accountLoggingIn} </>}   
          </>
        }
        {( props.accountName && props.stateLoggedIn  && !props.stateLoggingIn ) && 
          <>{props.fakeName}</>
        }
        {( props.accountName && !props.stateLoggedIn  && props.stateLoggingIn ) && 
          <> 
              {props.accountLoggingIn}
          </>
        }  
        
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
