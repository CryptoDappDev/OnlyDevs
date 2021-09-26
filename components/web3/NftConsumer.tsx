import React, { Children, useEffect, useState, useRef } from 'react';
import { NFTConsumer } from './NftContext';
import { NFTEventsConsumer } from './NftContext';
import { useSeaport } from './seaportContext';
import { useMetaMask } from "metamask-react";

import Popup from 'reactjs-popup';


//Lotties
import Lottie from "lottie-react";
import closeButton from '../lottie/Modal/closeButton.json';
import confirmButton from '../lottie/Modal/confirmButton.json';
import loadingDots from '../lottie/Modal/loadingDots.json';
import moneyLottie from '../lottie/Modal/money.json';
import cashLottie from '../lottie/Modal/cash.json';
import noauthLottie from '../lottie/Modal/noauth.json';
import MeemoLottie from '../lottie/Meemo/Meemo.json';

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import OnramperWidget from "@onramper/widget";

export function NftConsumer ({...props}) {

  const [isMetaMask, setMetaMask] = useState(false);
  
  useEffect( () => {
    if(window.ethereum?.isMetaMask) {
      //console.log("🚀 ~ file: NftConsumerWallet.tsx ~ line 14 ~ NftConsumerWallet ~ isMetaMask!");
      setMetaMask(true);
    }
  },[]);

  function MetaMaskConsumer ({...props}) {

    //Hooks
    const {opensea} = useSeaport();
    const { account } = useMetaMask();

    //Context
    const {Nft} = NFTConsumer();
    const {Nft_events} = NFTEventsConsumer();

    //Unsafe Variable Types
    let NftAnyType : any = Nft;
    let Nft_eventsAnyType : any = Nft_events;
  
    //States
    const [Nft_data, setNft_data] = useState("null");
    const [Nft_data_events, setNft_data_events] = useState("null");

    //State Derivatives
    const [Nft_owner_names, setNft_owner_names] = useState([""]);
    const [Nft_owner_address, setNft_owner_address] = useState([""]);
    const [Nft_owner_numAssets, setNft_owner_numAssets] = useState([0]);
    const [Nft_num_owner, setNft_num_owner] = useState(0);
    const [Nft_owner_image, setNft_owner_image] = useState([""]);


    const [Nft_price, setNft_price] = useState(0);



    useEffect (() => {

      //Debug
      // // // // //console.log("🚀 ~ file: NftConsumer.tsx ~ line 41 ~ useEffect ~ props", props)
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 42 ~ useEffect ~ NFT ~ ", Nft)
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 43 ~ useEffect ~ NFT EVENTS ~ ", Nft_events)

      //Check to see if this asset is already loaded
      if ((Nft_data === Nft) && (Nft_data_events === Nft_events)) {
        //console.log("🚀 ~ NFT ALREADY CONSUMED");

      } else {

        //Will set to null or Hydrated UI on first load
        setNft_data(Nft);
        setNft_data_events(Nft_events);

        //Any type for JSON object coming from API call

        //Make Sure Request has been completely filled 
        if( (!( Nft == "")) && (!( Nft_events == "")) ) {
          
          //console.log("🚀 ~ SORTING REQUESTED");

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

          //Set States
          setNft_owner_names(owner);
          setNft_owner_address(ownerAddress);
          setNft_owner_numAssets(ownerNumOfAssets);
          setNft_num_owner(numOwners);
          setNft_owner_image(ownerImage);

          //Try to set price here
          try {
            let price : any = JSON.stringify(NftAnyType.assets[0].sell_orders[0].current_price/(1000000000000000000));
            setNft_price(price);
          } catch(e) {
            console.log( "🚀 ~ " + e)
          }

          //Debug Owners
          
          //console.log("🚀 ~ TESTING FINAL OWNERS EVENT USERNAMES ");
          //console.log("🚀 ~ TESTING FINAL OWNERS EVENT ACCOUNTS ");
          //console.log("🚀 ~ TESTING FINAL OWNERS EVENT NUMBER OF OWNED ASSETS ");
          //console.log("🚀 ~ TESTING FINAL OWNERS EVENT PROFILE IMAGE ");
          //for(let z=0; z<numOwners; z++) {
            //console.log("🚀 ~ " + owner[z]);
            //console.log("🚀 ~ " + ownerAddress[z]);
            //console.log("🚀 ~ " + ownerNumOfAssets[z]);
            //console.log("🚀 ~ " + ownerImage[z]);
          //}
          
        }
      }

    },[props, Nft])


    /**
     *  CHECKOUT MODAL
     * 
     *  Provides an Interactive Event Halding Experience for Buying NFTs
     */
     function Order({...props}) {

      

      const ref : any = useRef();

      const closeButtonRef : any = useRef();
      const confirmButtonRef : any = useRef();
      const MeemoRef : any = useRef();
      const LowEthRef : any = useRef();
      
      const btn_style = {
        float: 'right',
        width: '35px',
        padding: '10px 10px 0px 0px',
        cursor: 'pointer'
      } as React.CSSProperties;
      
      //const bridge = "https://bridge.walletconnect.org";
      //const UniLink = "https://example.wallet/wc?uri=wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=91303dedf64285cbbaf9120f6e9d160a5c8aa3deb67017a3874cd272323f48ae"
      
      //const connector = new WalletConnect({bridge, qrcodeModal: QRCodeModal });
      //const provider = new WalletConnectProvider({ infuraId: "0551dcd029704425a5836f593dce29d3" });
      //const web3 = new Web3(provider);
      
      
      //const { order, accountAddress, page } = props;
      const [order, setOrder] = useState<any>();  
       
      async function getOrders() {

        const {orders, count} = await opensea.seaport.api.getOrders( {
          bundled: false,
          asset_contract_address: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
          token_id: NftAnyType.assets[0].token_id,
          limit: 1
        });
        setOrder(orders[0]);
      }

      getOrders();
      
      const { status, connect, account } = useMetaMask();
      
      const [confirm, setConfirm] = useState(false);
      const [cancel, setCancel] = useState(true);
      const [creatingOrder, setCreatingOrder] = useState(false);
      
      const [ShowModal, setShowModal] = useState(false);
      
      const [BetaTester, setBetaTester] = useState(false);
      
      const [BuyFiatFlag, setBuyFiatFlag] = useState(false);
      const [LowEthFlag, setLowEthFlag] = useState(false);
      const [NoAuthFlag, setNoAuthFlag] = useState(false);
      const [successFlag, setSuccessFlag] = useState(false);
      const [meemoFlag, setMeemoFlag] = useState(true);
      const [meemoLoopFlag, setMeemoLoopFlag] = useState(false);
      
      const [ethPrice, setEthPrice] = useState(0);
      const [ethGas, setEthGas] = useState(0);
      const [ethWait, setEthWait] = useState(0);
      
      let errmsg = "";
      let successmsg = false;

      const wallets = {
        ETH: { address: account}
      };
      
      //Checkout Logic
      function openTooltip() {
        errmsg = "";
        setConfirm(false);
        ref.current.open();
        setShowModal(true);
        FetchEthPrice();
      
        //FetchOrder();
      
      }

      useEffect(() => {
        
        if(props.ShowCheckOut == true) {
          if(ShowModal == false) {
            //First Open ToolTip
            openTooltip();

            if(props.ShowLowEthFlag == true) {
              //Show Low Eth Screen
              setConfirm(true);
              setLowEthFlag(true);
            } else if (props.ShowSuccessFlag == true) {
              //Show Purchase Sucessful Screen
              setConfirm(true);
              setSuccessFlag(true);
            } else if (props.ShowUserRejectedFlag == true) {
              //User Rejected Transaction
              setConfirm(true);
              setNoAuthFlag(true);
            } else if (props.ShowBuyFiatFlag == true) {
              //Onramper Screen inside Checkout
              setConfirm(true);
              setBuyFiatFlag(true);
            } else if (props.ShowAwaitingOrder == true) {
              //Awaitng Confirmation of Order
              setConfirm(true);
              setCreatingOrder(true); 
            }
            
          }
        }

        //Once Show Checkout is Disabled Just close the Modal
        if(props.ShowCheckOut == false) {
          if(ShowModal == true) {
            OnCompleteClose();
          }
        }

      },[props.ShowCheckOut]);
      

      async function FetchEthPrice() {
        let response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'); 
        let data = await response.json();
        console.log(data.USD);
        setEthPrice(data.USD);
      
        response = await fetch('https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=a9db0b354c0f63a9b1807d80b358a4c1441fa94e9500d4b550680f1afe74'); 
        data = await response.json();
        setEthGas(data.fast);
        setEthWait(data.avgWait);
      
      
      }
      async function FetchOrder() {
      


        /*
        console.log('Getting Assets...');
        let seaport;
        seaport = opensea.seaport;

        //Timmy Test (2 NFTS)
        //0x15fceFdA3E6c2f313B22D24Aa6CC35F0d86F39CE
      
        //Empty Wallet (0 NFTS)
        //0x7EC65cDe82a667302dec55692Cc40ab65cb3E031
      
      
      
        let response = await seaport.api.getAssets({
          owner : '0x15fceFdA3E6c2f313B22D24Aa6CC35F0d86F39CE',
          limit : 50,
        });
        console.log(response);
        console.log(response.assets.length);
        if (response.assets.length > 0) {
      
          console.log('User Owns OpenSea NFTs');
          for (let i=0; i<response.assets.length; i++) {
            //if()
            console.log('')
            console.log(response.assets[i].name);
            console.log(response.assets[i].tokenId);
            console.log(response.assets[i].assetContract.address);
            console.log('')
      
            if (response.assets[i].tokenId === '31673350562246474401696226698567993468440352420607247670176787853265168499108' ) {
              if (response.assets[i].assetContract.address === '0x495f947276749ce646f68ac8c248420045cb7b5e') {
                console.log('SEC Founder Token Identified!');
                setBetaTester(true);
              }
            }
          }
        } else {console.log('No NFTs Detected...')}
        */
      }
      
      function OnClickClose() {closeButtonRef.current.playSegments([20,35],true)}
      
      
      function OnCompleteClose () {
        document.getElementById('checkoutModal')!.classList.add('SlideOutBottom');
        //Close Modal
        setTimeout(() => ref.current.close(), 250)
        //Reset State Machine
        setTimeout(() => {
          console.log(account)
          errmsg = '';
          setLowEthFlag(false);
          setNoAuthFlag(false);
          setMeemoLoopFlag(false);
          setMeemoFlag(true);
          setConfirm(false);
          successmsg = false;
          setSuccessFlag(false);
          setShowModal(false);
          setBuyFiatFlag(false);
          setBetaTester(false);
        }, 750)
      }
      
      function OnCompleteConfirm () {
        console.log("🚀 ~ Attempting to Fulfill Order");
        document.getElementById('confirmPanel')!.classList.add('SlideOutTopXS');
        setTimeout(() => {
          setConfirm(true);
          setCancel(false);
          fulfillOrder(); 
        },150)
      }
      
        //Order Logic
        function onError(error : any) {
          errmsg = error.message;
      
          setTimeout(() => console.log(error.message), 3000) 
        }
      
        async function fulfillOrder() {
          setCreatingOrder(true);
          
          try {
            let seaport;
            if (status === "unavailable") {
              console.log('Using Wallet Connect Provider...');
              let provider = new WalletConnectProvider({ infuraId: "0551dcd029704425a5836f593dce29d3" });
              seaport = opensea.seaport;
              await provider.enable();
            } else { 
              console.log('Using Injected Web3 Provider...'); 
              seaport = opensea.seaport;
            }
      
            let accountAddress : string = account!;
            //console.log("🚀 ~ Fulfill Order: ", order);
            await seaport.fulfillOrder({ order, accountAddress });
              
          } catch(error) {
            onError(error)
          } finally {
            console.log('🚀 ~ Error Msg State:');
            console.log("🚀 ~ Error Message: " + errmsg);
          }
          
          if(errmsg == '') {
            //console.log('🚀 ~ Sucess Msg Sent');
            setSuccessFlag(true);
            setMeemoFlag(false);
          } else {
            //console.log('🚀 ~ Error Found');
            //console.log("🚀 ~ Error Message" + errmsg);
      
            if (errmsg.includes('err: insufficient funds')) {
              //console.log('')
              //console.log('🚀 ~ ERROR MSG LOW ETH');
              //console.log('')
              setLowEthFlag(true);
              //setTimeout(() => ( LowEthRef.current.setSubFrame(false), 100));
            } else if (errmsg.includes('failed to authorize transaction:')) {
              //console.log('')
              //console.log('🚀 ~ ERROR MSG NO AUTH');
              //console.log('')
              setNoAuthFlag(true);
              setMeemoFlag(false);
            }
          }
      
          console.log('🚀 ~ Order Complete');
          setCreatingOrder(false);
          setCancel(true);
        }
      
        function BuyFiat() {
      
          setNoAuthFlag(false);
          setLowEthFlag(false);
          console.log(account);
          setBuyFiatFlag(true);
        }

        //useEffect(() => {console.log("🚀 ~ Account We Think is Signed in: ", account)},[account]);
      
        return (
          <div > 
            {((account == null)) &&
              <>{props.buyNotSignedIn}</>
            }
            {(!(account == null)) &&
              <div onClick={openTooltip}>
                {props.buySignedIn}
              </div>
            }
          
            <Popup ref={ref} modal={true} lockScroll={true} closeOnDocumentClick={false} closeOnEscape={false} >
              <div id='checkoutModal' className='modalpagewrapper purchasePopup SlideInBottom'>
                <div className='modalwrapper'>
                    {(cancel == true) &&
                      <>
                      <div style={{color: "#6E79E7"}} className='mx-5 float-left MonumentFontLight AssetText PriceWrapper'>ETH: ${Math.round(ethPrice)} &nbsp; {Math.round(((ethGas/10)+1))} GWEI &nbsp; Avg Wait: {Math.round(ethWait)} min</div>
                      
                      <div className='' onClick={OnClickClose}>
                        <Lottie lottieRef={closeButtonRef} style={btn_style} animationData={closeButton} autoplay={false} onLoopComplete={OnCompleteClose} />
                      </div>
                      </>
                    }{(cancel == false ) && <div className='PriceWrapper'><div className='CancelButtonPlaceHolder'></div></div>}
  
                    <div className='pl-5 pr-5 pb-5 pt-2 '>
                    
                      { (creatingOrder === true) && <div> {props.awaitingOrder} </div> }
                      
                      {((confirm === false) ) &&
                        <div id='confirmPanel' className='confirmPanel row justify-content-center'>
                          {props.checkout}
                          <div onClick={OnCompleteConfirm}>
                            {props.checkoutBtn}
                          </div>
                        </div>
                      }
                      
                      {(LowEthFlag  === true) &&
                        <div className='justify-content-center pt-5'>
                          {props.lowEthFlag}                       
                          <div className='SlideInBottomXS' id='BuyFiatBtn' onClick={BuyFiat}>
                            {props.lowEthBuyFiat}
                          </div> 
                        </div>
                      }
                      
                      {( successFlag  === true) && <div> {props.successFlag} </div> }

                      {( NoAuthFlag === true) && <div> {props.userRejectedFlag} </div> }
                    
                      {(BuyFiatFlag === true) &&
                        <div style={props.FiatWindowStyle}>

                          <iframe
                            src="https://widget.onramper.com?color=346eeb&apiKey=pk_test_e4yVaWYJylYgjgftFk6XTm6Yb03E0TY8oieRaICMngU0"
                            height="595px"
                            width="440px"
                            title="Onramper widget"
                            >
                            </iframe>
                        </div>
                      }

                    <div className='Spacer'></div>
                  </div>
                </div>
              </div>
            </Popup>
          </div>
        )
      }

    /*

      FUTURE ADDITIONS TO CONSUMER
      
        // Last Traded Price
        // First Traded Price
        // Highest Traded Price
        // Lowest Traded Price 

        //Most Traded Day/Week/Month
        //Previous Owners
        ...

      More 2nd lvl Derivatives

      3rd lvl Derivates
      //Asset Growth/Shrink Over time
      
      More 3rd lvl Derivates

      //Auctions
      //Countdown Timer
      //Current Bid
      //

    */

      // 

    //Any type to allow rendering from Nft
    let OwnerArray : number[] = [];
    
    //Derive list array for owners
    for (let p=0; p<Nft_num_owner; p++) {
      OwnerArray[p] = p;
    }

    const OwnerList = OwnerArray.map((owner) =>
      <div >
        <div style={props.ownerName}>
          {JSON.stringify(Nft_owner_names[owner]).replace(/['"]+/g, '')} 
        </div>
        <div>
          <img style={props.ImageStyle} src={Nft_owner_image[owner]}/>
        </div>
        <div style={props.ownerAddress}>
          {JSON.stringify(Nft_owner_address[owner]).replace(/['"]+/g, '')}
        </div>
        <div style={props.ownerNumAssets}>
          {JSON.stringify(Nft_owner_numAssets[owner]).replace(/['"]+/g, '')}
        </div>
      </div>
    )


    return (
  
        <div className={props.className}>

          {((props.name) && (!(NftAnyType === ""))) && <> {JSON.stringify(NftAnyType.assets[0].name).replace(/['"]+/g, '')} </> }
        
          {((props.buy) && (!(NftAnyType === ""))) && <> <Order {...props}/> </> }
        
          {((props.creator) && (!(NftAnyType === ""))) && <> {JSON.stringify(NftAnyType.assets[0].creator.user.username).replace(/['"]+/g, '')} </> }

          {((props.creatorImage) && (!(NftAnyType === ""))) && <img style={props.ImageStyle} src={NftAnyType.assets[0].creator.profile_img_url} />  }
        
          {((props.numberOfSales) && (!(NftAnyType === ""))) && <> {JSON.stringify(NftAnyType.assets[0].num_sales).replace(/['"]+/g, '')} </> }
        
          {((props.tokenId) && (!(NftAnyType === ""))) && <> {JSON.stringify(NftAnyType.assets[0].token_id).replace(/['"]+/g, '')} </> }
        
          {((props.contract) && (!(NftAnyType === ""))) && <> {JSON.stringify(NftAnyType.assets[0].asset_contract.address).replace(/['"]+/g, '')} </> }
        
          {((props.description) && (!(NftAnyType === ""))) && <div style={{whiteSpace: "pre-wrap"}}> {JSON.stringify(NftAnyType.assets[0].description).replace(/['"]+/g, '').replace("\\n\\n", " \n ").replace("\\n", " \n ")} </div> }
        
          {((props.collectionName) && (!(NftAnyType === ""))) && <> {JSON.stringify(NftAnyType.assets[0].collection.name).replace(/['"]+/g, '')} </> }
        
          {((props.collectionDescription) && (!(NftAnyType === ""))) && <div style={{whiteSpace: "pre-wrap"}}> {JSON.stringify(NftAnyType.assets[0].collection.description).replace(/['"]+/g, '').replace("\\n\\n", " \n ").replace("\\n", " \n ")} </div> }
        
          {((props.thumbnail) && (!(NftAnyType === ""))) && 
            <img src={JSON.stringify(NftAnyType.assets[0].image_thumbnail_url).replace(/['"]+/g, '')} style={{objectFit:props.fit}} width="100%" height="100%" ></img> 
          }
        
          {((props.image) && (!(NftAnyType === ""))) && 
            <img src={JSON.stringify(NftAnyType.assets[0].image_url).replace(/['"]+/g, '')} style={{objectFit:props.fit}} width="100%" height="100%" ></img> 
          }
        
          {((props.externalLink) && (!(NftAnyType === ""))) && 
            <a href={JSON.stringify(NftAnyType.assets[0].external_link).replace(/['"]+/g, '')} > {props.children} </a> 
          }
          
          {((props.owner)  && (!(NftAnyType === ""))) && <> {OwnerList} </> }

          {(((props.price) && (!(NftAnyType === "")))) && 
            <>
            {(Nft_price === 0) && <div>Not Available</div> }
            {(!(Nft_price === 0)) && <> {Nft_price} </> } 
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
