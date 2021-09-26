import React, { useEffect, useState, useRef } from 'react';
import { NFTConsumer } from './NftContext';


import detectEthereumProvider from '@metamask/detect-provider';
import { useMetaMask } from "metamask-react";
import { Skeleton } from '@material-ui/lab';



export function NftConsumerWallet ({...props}) {

  const [isMetaMask, setMetaMask] = useState(false);
  
  useEffect( () => {
    if(window.ethereum?.isMetaMask) {
      //console.log("🚀 ~ file: NftConsumerWallet.tsx ~ line 14 ~ NftConsumerWallet ~ isMetaMask!");
      setMetaMask(true);
    }
  },[])

  function MetaMaskConsumer ({...props}) {

    const {Nft} = NFTConsumer();
    const { status, connect, account } = useMetaMask();
    const [loggedIn, setLoggedin] = useState();

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
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 18 ~ useEffect ~ props", props)
      //console.log("🚀 ~ file: NftConsumer.tsx ~ line 18 ~ useEffect ~ NFT", Nft)

    },[props, Nft])


    //Complicated Metamsk Logic for Login/Logout
    return (
      <div className={props.className}>




        {(  ((props.login) && ((!(props.accountAddress)) && (!(props.accountBalance))) && (!(props.accountInfo)) ) && ( ((!(props.stateLoggedIn))&&(!(props.stateLoggingIn))) )  ) && 
          <> 
            {(status === "notConnected") && <div onClick={() =>connect()}> {props.accountLogin} </div>}
            {(status === "connected") && <> {props.accountLoggedIn} </>}
            {(status === "connecting") && <> {props.accountLoggingIn} </>}   
          </>
        }
        {(  ((props.login) && ((!(props.accountAddress)) && (!(props.accountBalance))) && (!(props.accountInfo)) ) && ( (((props.stateLoggedIn))&&(!(props.stateLoggingIn))) )  ) && 
          
          <> {props.accountLoggedIn} </>
        }
        {(  ((props.login) && ((!(props.accountAddress)) && (!(props.accountBalance))) && (!(props.accountInfo)) ) && ( ((!(props.stateLoggedIn))&&((props.stateLoggingIn))) )  ) && 
          <> 
              <> {props.accountLoggingIn} </>
          </>
        }





        {(  ((props.accountAddress) && ((!(props.login)) && (!(props.accountBalance))) && (!(props.accountInfo)) ) && ( (!(props.stateLoggedIn))&&(!(props.stateLoggingIn)) )  ) &&
          <> 
            {(status === "notConnected") && <> {props.accountNone} </>}
            {(status === "connected") && <> {account} </>}
            {(status === "connecting") && <> {props.accountLoggingIn} </>}   
          </>
        }
        {(  ((props.accountAddress) && ((!(props.login)) && (!(props.accountBalance))) && (!(props.accountInfo)) ) && ( ((props.stateLoggedIn))&&(!(props.stateLoggingIn)) )  ) && 

            <>0x5b3256965e7C3cF26E11FCAf296DfC8807C01073</>

        }
        {(  ((props.accountAddress) && ((!(props.login)) && (!(props.accountBalance)))  && (!(props.accountInfo)) ) && ( (!(props.stateLoggedIn))&&((props.stateLoggingIn)) )  ) && 
          <> 
            {props.accountLoggingIn}
          </>
        }
        




        {(  ((props.accountBalance) && ((!(props.accountAddress)) && (!(props.login))) && (!(props.accountInfo)) ) && ( (!(props.stateLoggedIn))&&(!(props.stateLoggingIn)) )  ) && 
          <> 
            {(status === "notConnected") && <> {props.accountNone} </>}
            {(status === "connected") && <>69.420</>}
            {(status === "connecting") && <> {props.accountLoggingIn} </>}   
          </>
        }
        {(  ((props.accountBalance) && ((!(props.accountAddress)) && (!(props.login))) && (!(props.accountInfo)) ) && ( ((props.stateLoggedIn))&&(!(props.stateLoggingIn)) )  ) && 
          <> 
            69.420 
          </>
        }
        {(  ((props.accountBalance) && ((!(props.accountAddress)) && (!(props.login))) && (!(props.accountInfo)) ) && ( (!(props.stateLoggedIn))&&((props.stateLoggingIn)) )  ) && 
          <> 
              {props.accountLoggingIn}
          </>
        }





        {(  ((props.accountInfo) && ((!(props.accountAddress)) && (!(props.accountBalance))) && (!(props.login)) ) && ( (!(props.stateLoggedIn))&&(!(props.stateLoggingIn)) )  ) && 
          <> 
            {(status === "notConnected") && <> {props.accountNone} </>}
            {(status === "connected") && <> {props.accountLoggedIn} </>}
            {(status === "connecting") && <> {props.accountLoggingIn} </>}   
          </>
        }
        {(  ((props.accountInfo) && ((!(props.accountAddress)) && (!(props.accountBalance))) && (!(props.login)) ) && ( ((props.stateLoggedIn))&&(!(props.stateLoggingIn)) )  ) && 
          <> 
            {props.accountLoggedIn} 
          </>
        }
        {(  ((props.accountInfo) && ((!(props.accountAddress)) && (!(props.accountBalance))) && (!(props.login)) ) && ( (!(props.stateLoggedIn))&&((props.stateLoggingIn)) )  ) && 
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
