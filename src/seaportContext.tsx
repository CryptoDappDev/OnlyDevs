import React, { useReducer } from 'react'

import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js';

type Action = {type: 'networkChange'}
type Dispatch = (action: Action) => void
type State = {seaport: OpenSeaPort}
type CountProviderProps = {children: React.ReactNode}

declare let window: any;

const StateContext = 
React.createContext < {opensea: State; dispatch: Dispatch} | undefined > (undefined);

function Reducer(state: State, action: Action) {
  switch (action.type) {
    case 'networkChange': {

      //Future: Different Providers can be put here

      //Web3 Provider
      let web3Provider = typeof Web3? window.web3.currentProvider
	    : new Web3.default.providers.HttpProvider('https://mainnet.infura.io/v3/0551dcd029704425a5836f593dce29d3')
      //Opensea Port
      const seaport = new OpenSeaPort(web3Provider, { networkName: Network.Main, apiKey: '5f69ba6e1bea4a2ca7b78fb4a4ddd9ee' });
      return {seaport: seaport}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function SeaportProvider({children}: CountProviderProps) {

  //Web3 Provider
  let web3Provider;
  if (typeof window !== "undefined") {
    web3Provider = window.web3.currentProvider;
  } else {
    web3Provider =
    new Web3.default.providers.HttpProvider('https://mainnet.infura.io/v3/0551dcd029704425a5836f593dce29d3');
  }

  //Opensea Port
  const port = new OpenSeaPort(web3Provider, { networkName: Network.Main, apiKey: '5f69ba6e1bea4a2ca7b78fb4a4ddd9ee' });
  
  //Initial Context Set
  const [opensea, dispatch] = useReducer(Reducer, {seaport: port})

  //Create Context Value and Pass it to Provider
  const value = {opensea, dispatch}
  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  )
}

//Hook to use Context
function useSeaport() {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

//Prover and Hook
export {SeaportProvider, useSeaport}