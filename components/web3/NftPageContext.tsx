import React, { useEffect, useState } from 'react';
import { useDBContext, useOpenSeaKeyContext, usePageDataContext } from '../../pages/[[...catchall]]';
import { useRouter } from 'next/router'
import { usePageTitleContext } from '../../pages/_app';
import { useMetaMask } from "metamask-react";
import AWS from "aws-sdk";

//Global Stack/Cache Variables
let NftStack : any = [];
let NftEventStack : any = [];
let NftCache : any = [];
let NftEventCache : any = [];

/**
 * 	--> Onlymemes Page Context Variables <--
 * @NftContextLocations NFT Locations on given page, specified in design
 * @NftContextProvider List of NFTs that need to be loaded onto page
 * @NftEventContextProvider List of corresponding NFT Events that need to be loaded onto page
 * @AccountNftProvider List of NFTs owned by any account logged in
 * @NFTCacheProvider List of all NFTs called to page
 * @NFTEventCacheProvider List of all corresponding NFT Events called to page
 */
const NftContextProvider = 
React.createContext < {NftPageContext: any[]; setNftPageContext : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);

const NftEventContextProvider = 
React.createContext < {NftEventPageContext: any[]; setNftEventPageContext : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);

const NftContextLocations = 
React.createContext < {NftPageLocations: any[]; setNftPageLocations : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);

const AccountNftProvider = 
React.createContext < {AccountNftStack: any[]; setAccountNftStack : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);

const NFTCacheProvider = 
React.createContext < {NFTCache: any[]; setNFTCache : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);

const NFTEventCacheProvider = 
React.createContext < {NFTEventCache: any[]; setNFTEventCache : React.Dispatch<React.SetStateAction<any>>} | undefined > (undefined);


export function NftPageContext ({...props}) {

	//Metamask Account Hook
	const { account } = useMetaMask();

	useEffect( () => {

		//console.log("🚀 ~ Account Connected: ", account);
	  },[account]);

	//Page Data Context
	const {pageData} = usePageDataContext();
	const {PageTitle, setPageTitle} = usePageTitleContext();
	const {OpenSeaKey} = useOpenSeaKeyContext();
	const router = useRouter();
	const { URLquery } = router.query;
	

	if(pageData.includes("Dev")){
		console.log("🚀 ~ Inside Plasmic ~ Using Dev Data");
		console.log("🚀 ~ Page Context Given ~ ", pageData);
	} else {

		
		setPageTitle("Home | OnlyMemes ✅ ");
		//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀");
		//console.log("🚀 ~ Production ~ Using DB Data");
		//console.log("🚀 ~ Page Context Given ~ ", pageData);
		//console.log("🚀 ~ URL Path Context Given ~ ", URLquery );
		//console.log("🚀 ~ Title Context Given ~ ", PageTitle );
		const { DBLoginInfo, setDBLoginInfo } = useDBContext();
		//console.log("🚀 ~ PLASMIC DB Login Info:", DBLoginInfo);

		AWS.config.update({
			accessKeyId: DBLoginInfo.id,
			secretAccessKey: DBLoginInfo.key,
			region: 'us-east-2'
		  });

		//const db = new AWS.DynamoDB.DocumentClient({ apiVersion: 'latest' });
		const ddb = new AWS.DynamoDB({ apiVersion: 'latest' });

		// Call DynamoDB to retrieve the list of tables
		ddb.listTables({Limit: 10}, function(err, data) {
			if (err) {
			//console.log("🚀 ~ Error: ", err.code);
			} else {
			//console.log("🚀 ~ Table names are: ", data.TableNames);
			}
		});
		var params = {
			TableName: 'HomePageData',
			Item: {
			  'Key' : {N: '1'},
			  'contract' : {S: 'TEST'},
			  'tokenID' : {S: 'TEST'}
			}
		  };
		  
		  // Call DynamoDB to add the item to the table
		  ddb.putItem(params, function(err, data) {
			if (err) {
			  //console.log("🚀 ~ Error: ", err);
			} else {
			  //console.log("🚀 ~ Success: ", data);
			}
		  });
	}
	

	//Use States of Contet Variables
	const [NftRequested , setNftRequested] = useState(false);
	const [ NftPageContext, setNftPageContext ] = useState<any>("");
	const [ NftEventPageContext, setNftEventPageContext ] = useState<any>("");
	const [ NftPageLocations, setNftPageLocations ] = useState<any>("");
	const [ AccountNftStack, setAccountNftStack ] = useState<any>("");
	const [ NFTCache, setNFTCache ] = useState<any>("");
	const [ NFTEventCache, setNFTEventCache ] = useState<any>("");

	//Context Wrapped Variables
	const value = {NftPageContext, setNftPageContext};
	const value_2 = {NftEventPageContext, setNftEventPageContext};
	const value_3 = {NftPageLocations, setNftPageLocations};
	const value_4 = {AccountNftStack, setAccountNftStack};
	const value_5 = {NFTCache, setNFTCache};
	const value_6 = {NFTEventCache, setNFTEventCache}

	//Call Updater Function for getting Nfts
	useEffect (() => {

		//Identity Check (Beta Tester Card only for now) -> To be Replaced by a DB call
		getNFT("18776689953573188178236043411178001783167154030768354233039085512119153590322",
		"0x495f947276749Ce646f68AC8c248420045cb7b5e");
		
		setTimeout(() => {
			
			//Get All NFTs on Page
			if (NftRequested == false) {
				setNftRequested(true);
				console.log("🚀 ~ NFT Locations: ", props.locations);
				getNfts(0);
			};
			
			

		},500)
	},[]);

	//Update Profile NFTs connected to page
	useEffect (() => {

		getProfileNFTs();
	},[account])

	/**
	 * 
	 * Function to collect NFTs attachted to Account logged in
	 *  
	 */
	async function getProfileNFTs () {

		//Check if there is an account logged in 
		if(account != null) {

			/*
			console.log("🆔  ~ ACCOUNT DETECTED: ", account);
			
			let request = 
			"https://api.opensea.io/api/v1/assets?" + 
			"owner=" + account +
			"&format=json&limit=50&offset=0&order_direction=desc"
			*/

			console.log("🆔  ~ ACCOUNT OVERRIDE: ", "0xb3b222f9a47c1dad79b4318d298def4b07b3b0c1");

			let request = 
			"https://api.opensea.io/api/v1/assets?" + 
			"owner=" + "0xb3b222f9a47c1dad79b4318d298def4b07b3b0c1" +
			"&format=json&limit=50&offset=0&order_direction=desc"


			await fetch(request)
			.then(function (response) {
				return response.json();
			})
			.then(function(data) {
				let opensea_response = JSON.parse(JSON.stringify(data));

				
				//Response success/failure handling
				//console.log("🆔  ~ OPENSEA RESPONSE PROFILE REQUEST ~ " + JSON.stringify(opensea_response));
				//console.log("🆔  ~ OPENSEA RESPONSE PROFILE REQUEST ~ " + JSON.stringify(opensea_response));
				setAccountNftStack(opensea_response);

				/*
				if ( JSON.stringify(opensea_response) == JSON.stringify({"token_ids":{"0":["value is not a valid integer"]}}) ) {
				console.log("🚀  ~ OPENSEA RESPONSE NONE FOUND");

				}
				else if ( JSON.stringify(opensea_response) == JSON.stringify({"detail":"Request was throttled."}) ) {
				console.log("🚀  ~ OPENSEA RESPONSE THROTTLED FOUND");

				} else {
				console.log("🚀  ~ OPENSEA REQUEST SUCCESS");
				console.log("🚀  ~ OPENSEA RESPONSE tknID: " + opensea_response.assets[0].token_id);
				NftCache[NftCache.length] = opensea_response.assets[0];
				}
				*/
			})
		} else {
			console.log("🆔  ~ NO ACCOUNT CONNECTED");
		}
	}

	/**
	 * Gets Nft from OpenSea API using fetch
	 * 
	 * @param Nft_token Token Address parameter from openSea
	 * @param Nft_contract Contract that minted the NFT
	 */
	async function getNFT (Nft_token : any, Nft_contract: any) {

		//Variables
		let Cached : boolean = false; 

		//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
		//console.log("🚀 ~ ~ ~ ~ ~ CACHE Override Check START ~ ~ ~ ~ ~ 🚀 ");
		//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
		//console.log("🚀 ~ Looking for Match in here: ", NftCache);

		//console.log("🚀 ~ Given Token: ", Nft_token);
		//console.log("🚀 ~ Given Cache: ", NftCache);
		//console.log("🚀 ~ Given Key: ", PositionKey);

		//Check Cache for NFT that could have already filled another slot
		for (let i=0; i<NftCache.length; i++) {
			//console.log("🚀  ~ NFT CACHE FOR LOOP: ", NftCache[i].token_id);
			if(NftCache[i].token_id == Nft_token) {
				
				//console.log("🚀  ~ WE GOT A MATCH: ", NftCache[i].token_id);
				//If we have a match in the Cache -> Dont need Request
				Cached = true;
				
			}

		}


		
		//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
		//console.log("🚀 ~ ~ ~ ~ ~ CACHE Override Check END ~ ~ ~ ~ ~ 🚀 ");
		//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
		

		if( Cached == false ) {

			//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
			//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");


			//Opensea Contract Default Request
			if(Nft_contract == "None") {
				
				/**
				 * Request NFT Part 1: Get Detials on NFT from API Fetch
				 */
				 console.log("🚀 ~ ~ ~ ~ ~ NFT REQUESTED ~ ~ ~ ~ ~ 🚀 ");
				let request = 
				"https://api.opensea.io/api/v1/assets?" + 
				"asset_contract_addresses=" + "0x495f947276749Ce646f68AC8c248420045cb7b5e" +
				"&format=json&limit=1&offset=0&order_direction=desc" + 
				"&token_ids=" + Nft_token;

				await fetch(request, {
					headers:{"X-API-KEY": OpenSeaKey}
				})
				.then(function (response) {
					return response.json();
				})
				.then(function(data) {
					let opensea_response = JSON.parse(JSON.stringify(data));

					
					//Response success/failure handling
					console.log("✅  ~ OPENSEA RESPONSE ~ " + JSON.stringify(opensea_response));

					if ( JSON.stringify(opensea_response) == JSON.stringify({"token_ids":{"0":["value is not a valid integer"]}}) ) {
					console.log("🚀  ~ OPENSEA RESPONSE NONE FOUND");

					}
					else if ( JSON.stringify(opensea_response) == JSON.stringify({"detail":"Request was throttled."}) ) {
					console.log("🚀  ~ OPENSEA RESPONSE THROTTLED FOUND");

					} else {
					console.log("🚀  ~ OPENSEA NFT REQUEST SUCCESS");
					//console.log("🚀  ~ OPENSEA RESPONSE tknID: " + opensea_response.assets[0].token_id);
					NftCache[NftCache.length] = opensea_response.assets[0];
					//setNFTCache(NftCache); 
					}
				})
				
				/**
				 * Request NFT Part 2: Get Trade History of NFT to 
				 */
				 console.log("🚀 ~ ~ ~ ~ ~ NFT EVENT REQUESTED ~ ~ ~ ~ ~ 🚀 ");
				setTimeout(async () => {
					let request_events = 
					"https://api.opensea.io/api/v1/events?" + 
					"asset_contract_address=" + "0x495f947276749Ce646f68AC8c248420045cb7b5e" +
					"&token_id=" + Nft_token +
					"&event_type=transfer&only_opensea=false&offset=0&limit=300";  

					await fetch(request_events, {
						headers:{"X-API-KEY": OpenSeaKey}
					})
					.then(function (response) {
						return response.json();
					})
					.then(function(data) {
						let opensea_events = JSON.parse(JSON.stringify(data));
						
						console.log("🚀 ~ Result EVENTS ~ " + JSON.stringify(opensea_events));

						//NftEventStack[NftEventStack.length] = opensea_events;

						NftEventCache[NftEventCache.length] = opensea_events;
						setNFTEventCache(NftEventCache);
						
						console.log("🚀  ~ EVENT REQUEST SUCCESS");

						console.log("🚀 ~ New NFT Event Cache ~ ", NftEventCache); 
						//setNFTEventCache()
						//If Array is full (300), time to check for more...
						//console.log("🚀  Result 1 SIZE ~ " + opensea_events.asset_events.length);
						/*
						if(opensea_events.asset_events.length === 300) {
						Logic for multiple calls for event lists >300
						}
						*/
					})
				},1000)
			} 
			

			//Custom Contract Request
			else {
			
				/**
				 * Request NFT Part 1: Get Detials on NFT from API Fetch
				 */
				 console.log("🚀 ~ ~ ~ ~ ~ NFT REQUESTED ~ ~ ~ ~ ~ 🚀 ");
				let request = 
				"https://api.opensea.io/api/v1/assets?" + 
				"asset_contract_addresses=" + Nft_contract +
				"&format=json&limit=1&offset=0&order_direction=desc" + 
				"&token_ids=" + Nft_token;
				
				await fetch(request, {
					headers:{"X-API-KEY": OpenSeaKey}
				})
				.then(function (response) {
					return response.json();
				})
				.then(function(data) {
					let opensea_response = JSON.parse(JSON.stringify(data));
					
					//Response success/failure handling
					console.log("✅  ~ OPENSEA RESPONSE ~ " + JSON.stringify(opensea_response));

					if ( JSON.stringify(opensea_response) == JSON.stringify({"token_ids":{"0":["value is not a valid integer"]}}) ) {
						console.log("🚀  ~ OPENSEA RESPONSE NONE FOUND");

					}
					else if ( JSON.stringify(opensea_response) == JSON.stringify({"detail":"Request was throttled."}) ) {
						console.log("🚀  ~ OPENSEA RESPONSE THROTTLED FOUND");

					} else {
						console.log("🚀  ~ OPENSEA NFT REQUEST SUCCESS");
						//console.log("🚀  ~ OPENSEA RESPONSE tknID: " + opensea_response.assets[0].token_id);
						
						NftCache[NftCache.length] = opensea_response.assets[0];
						//setNFTCache(NftCache); 
					}
				})

				/**
				 * Request NFT Part 2: Get Trade History of NFT to 
				 */
				 console.log("🚀 ~ ~ ~ ~ ~ NFT EVENT REQUESTED ~ ~ ~ ~ ~ 🚀 ");
				 setTimeout(async () => {
					let request_events = 
					"https://api.opensea.io/api/v1/events?" + 
					"asset_contract_address=" + Nft_contract +
					"&token_id=" + Nft_token +
					"&event_type=transfer&only_opensea=false&offset=0&limit=300";  

					await fetch(request_events, {
						headers:{"X-API-KEY": OpenSeaKey}
					})
					.then(function (response) {
						return response.json();
					})
					.then(function(data) {
						let opensea_events = JSON.parse(JSON.stringify(data));

						//console.log("🚀  Result EVENTS ~ " + JSON.stringify(opensea_events));

						NftEventCache[NftEventCache.length] = opensea_events;
						setNFTEventCache(NftEventCache);

						console.log("🚀  ~ EVENT REQUEST SUCCESS");
						//console.log("🚀  ~ EVENT CACHE: ", NftEventCache);


						//console.log("🚀 ~ New NFT Event Cache ~ ", NftEventCache); 

						//If Array is full (300), time to check for more...
						//console.log("🚀  Result 1 SIZE ~ " + opensea_events.asset_events.length);
						/*
						if(opensea_events.asset_events.length === 300) {
						Logic for multiple calls for event lists >300
						}
						*/
					})        
				},1000)
			}

			//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
			//console.log("🚀 ~ ~ ~ ~ ~ NFT REQUEST FINISH ~ ~ ~ ~ ~ 🚀 ");
			//console.log("🚀 ~ NFT Stack After Request Finsih ~ ", NftStack);
			//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");

		} else {
			console.log("🚀 ~ ~ ~ ~ ~ NFT Request was Cached!! ~ ~ ~ ~ ~ 🚀 ");
		}

		
	}

	/**
	 * Function to fills array with All Nfts needed for a page
	 * 
	 * @param key - Recursive placeholder for iterating NFT stack
	 */
	async function getNfts(key : number) {

		//Plasmic Locations Prop
		//console.log("🚀 ~ file: NftPageContext.tsx ~ line 18 ~ useEffect ~ Locations", props.locations);

		// Requests -> Number of Requested NFT Locations on this page
		let Requests : number = props.locations.length;

		//Future -> Check for Additonally Loaded "Infinite NFT Locations"

		if (key<Requests) {

				//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
				//console.log("🚀 ~ ~ ~ ~ ~ Updating Stack  ~ ~ ~ ~ ~ 🚀 ");
				//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
				
				let location = props.locations[key];
				let tmp = location.split("-").length;
				let tmp2 = location.split("-");
				let attribute_num = tmp2[tmp-1];
				let attribute = location.replace("-" + attribute_num , "");
		
				
				//console.log("🚀 ~ Location Attribute: ~ ", attribute);
				//console.log("🚀 ~ Number Attribute: ~ ", attribute_num);

				/**
				 * NFT OVERRIDE -> Gets NFT from Plasmic data
				 * NFT DATABASE -> Programatic Data from DB
				 */


				/**
				 *  NFT OVERRIDE INSERT (REQUESTING NFT)
				 */
				let override : any = false; //False until theres a valid override
				let overrideLength = props.overrides.length;
				for(let j=0; j<overrideLength-1; j++) {
					

					//Check if override is a location or a token ID/Contract Address -> Needs to be Location
					
					if((props.overrides[j] == location && (override == false))) {

						//console.log("🚀 ~ ~ ~ ~ ~ Stack Override ~ ~ ~ ~ ~ 🚀 ");
						//console.log("🚀 ~ Location: ", props.overrides[j]);
						
						//If So -> Look in the Next line for 0x -> If so then Make request with Contract+TokenID
						//										-> If not then make rquest with just TokenID
						if(props.overrides[j+1].includes("0x")) {

							//console.log("🚀 ~ Contract: ", props.overrides[j+1]);
							//console.log("🚀 ~ Token: ", props.overrides[j+2]);
							//console.log("🚀 ~ This is a Token + Contract override Item!");
							
							override = true;
							await getNFT(props.overrides[j+2], props.overrides[j+1]);

							
						} else if ( ! (props.overrides[j+1].includes("-") ) ) {

							//console.log("🚀 ~ This is a Token override Item!", props.overrides[j+1]);

							override = true;
							await getNFT(props.overrides[j+1], "None");

							
						} else {
							console.log("🚀 ~ This is NOT a VALID Token override Item!", props.overrides[j+1]);
						}

					}
					//console.log("🚀 ~ ~ ~ ~ ~ Stack Override Finsihed ~ ~ ~ ~ ~ 🚀 ");
				}

				/**
				 *  NFT DATABASE INSERT (REQUESTING NFT)
				 * 
				 * Only example catagories below, can be expanded for every NFT type on the Site
				 */
				if ( override == false) {

					console.log("🚀 ~ Override Condition not met, Getting Nft Info: ", attribute);

					//Trending Today NFts
					if(attribute == "trending-day") {

						console.log("🚀 ~ trending Nfts on the day Requested ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");

					} 
					
					//Trending This Week Nfts
					else if(attribute == "trending-week") {

						console.log("🚀 ~ trending Nfts on the week Requested ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
					} 
					
					//Trending This Month Nfts
					else if(attribute == "trending-month") {

						console.log("🚀 ~ trending Nfts on the month Requested ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
					} 

					//Trending All Time Nfts
					else if(attribute == "trending-alltime") {

						console.log("🚀 ~ trending Nfts for all time Requested ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
					} 

					//Popular Bid Nfts
					else if(attribute == "popular") {

						console.log("🚀 ~ popular Nfts Requested ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
					}  

					//Top Selling Today NFts
					else if(attribute == "top-sell-day") {

						console.log("🚀 ~ top selling Nfts on the day Requested ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
					} 
					
					//Top Selling This Week Nfts
					else if(attribute == "top-sell-week") {

						console.log("🚀 ~ top selling Nfts on the week Requested ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
					} 
					
					//Top Selling This Month Nfts
					else if(attribute == "top-sell-month") {

						console.log("🚀 ~ top selling Nfts on the month Requested ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
					} 

					//Top Selling All Time Nfts
					else if(attribute == "top-sell-alltime") {

						console.log("🚀 ~ top selling Nfts for all time Requested ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
					} 

					//Featured Nfts
					else if(attribute == "feature") {

						console.log("🚀 ~ Featured Collection of Nfts Requested ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
						console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
					} 
				}
			

			setTimeout(() => {

				/**
				 *  NFT OVERRIDE INSERT (ADD TO STACK)
				 */
				 let override : any = false; //False until theres a valid override
				 let overrideLength = props.overrides.length;
				 for(let j=0; j<overrideLength-1; j++) {
					 
 
					 //Check if override is a location or a token ID/Contract Address -> Needs to be Location
					 
					 if((props.overrides[j] == location && (override == false))) {
 
						 //console.log("🚀 ~ ~ ~ ~ ~ Stack Override ~ ~ ~ ~ ~ 🚀 ");
						 //console.log("🚀 ~ Location: ", props.overrides[j]);
						 
						 //If So -> Look in the Next line for 0x -> If so then Make request with Contract+TokenID
						 //										-> If not then make rquest with just TokenID
						 if(props.overrides[j+1].includes("0x")) {
							 //console.log("🚀 ~ Contract: ", props.overrides[j+1]);
							 //console.log("🚀 ~ Token: ", props.overrides[j+2]);
							 //console.log("🚀 ~ This is a Token + Contract override Item!");
							 
							 override = true;
 
							 let PositionFilled : boolean = false;
							 let NftCacheKey : number = 0;
 
							 //WARNING: DOES NOT MATCH CONTRACT ADDRESS YET
							 while (PositionFilled == false) {
 
								 if( NftCache[NftCacheKey].token_id.includes( props.overrides[j+2] ) ) {
 
									 //console.log("🚀 ~ Matcihng Nft Data found...");
									 PositionFilled = true;
									 NftStack[key] = NftCache[NftCacheKey];
									 NftEventStack[key] = NftEventCache[NftCacheKey];
									 
								 } else {
									 
									 NftCacheKey = NftCacheKey + 1;
									 //console.log("🚀 ~ Not the correct Nft Data...");
									 if (!(NftCache.length > NftCacheKey)) {
										 //console.log("🚀 ~ Data Not Found !!");
										 PositionFilled = true;
									 }
								 }
							 }
							 
 
						 } else if ( ! (props.overrides[j+1].includes("-") ) ) { //Test
 
							 //console.log("🚀 ~ This is a Token override Item!", props.overrides[j+1]);
							 
							 override = true;
 
							 let PositionFilled : boolean = false;
							 let NftCacheKey : number = 0;
 
							 //WARNING: DOES NOT MATCH CONTRACT ADDRESS YET
							 while (PositionFilled == false) {
 
								 if( NftCache[NftCacheKey].token_id.includes( props.overrides[j+1] ) ) {
 
									 //console.log("🚀 ~ Matcihng Nft Data found...");
									 PositionFilled = true;
									 NftStack[key] = NftCache[NftCacheKey];
									 NftEventStack[key] = NftEventCache[NftCacheKey];
									 console.log("🚀 ~ TEST POSITION: ", NftCacheKey);
 
									 console.log("🚀 ~ TEST NFT CACHE: ", NftCache);
									 console.log("🚀 ~ TEST NFT ARRAY 2: ", NftCache[2]);
									 
									 console.log("🚀 ~ TEST EVENTS CACHE: ", NftEventCache);
									 console.log("🚀 ~ TEST EVENTS ARRAY 2: ", NftEventCache[2]);
									 
								 } else {
									 
									 NftCacheKey = NftCacheKey + 1;
									 //console.log("🚀 ~ Not the correct Nft Data...");
									 if (!(NftCache.length > NftCacheKey)) {
										 //console.log("🚀 ~ Data Not Found !!");
										 PositionFilled = true;
									 }
 
								 }
								 
							 }
							 
						 } else {
							 console.log("🚀 ~ This is NOT a VALID Token override Item!", props.overrides[j+1]);
						 }
 
					 }
					 //console.log("🚀 ~ ~ ~ ~ ~ Stack Override Finsihed ~ ~ ~ ~ ~ 🚀 ");
				 }

				
				let tmp = key + 1;
				getNfts(tmp);

			}, 2000);
		}

		//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");
		//console.log("🚀 ~ ~ ~ ~ ~ Stack Update Finished ~ ~ ~ ~ ~ 🚀 ");
		//console.log("🚀 ~ NFT Stack After Request Finish ~ ", NftStack);
		//console.log("🚀 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 🚀 ");

		//Set Page Infomation Stack for UI Hydration ( Non Async, wont set awating NFT requests )
		setNFTCache(NftCache); 
		setNFTEventCache(NftEventCache);
		setNftPageContext(NftStack);
		setNftPageLocations(props.locations);
		setNftEventPageContext(NftEventStack);

	}   
            
	return (
		
		<div className={props.className}>
			<NFTEventCacheProvider.Provider value={value_6}>
				<NFTCacheProvider.Provider value={value_5}>
					<AccountNftProvider.Provider value={value_4}>
						<NftEventContextProvider.Provider value={value_2}>
							<NftContextLocations.Provider value={value_3}>
								<NftContextProvider.Provider value={value}>
									{props.children}
								</NftContextProvider.Provider>
							</NftContextLocations.Provider>
						</NftEventContextProvider.Provider>
					</AccountNftProvider.Provider>
				</NFTCacheProvider.Provider>
			</NFTEventCacheProvider.Provider>
		</div>
		
	);
}

export function usePageLocations() {
	const context = React.useContext(NftContextLocations);
	//console.log("✅ ~ NFT Location Context ~ ", context);
	if (context === undefined) {
	  throw new Error('Unhandled Exception! Please Refresh the Page')
	}
	return context
}

export function usePageContext() {
	const context = React.useContext(NftContextProvider);
	//console.log("✅ ~ NFT Stack Context After Request Finish ~ ", context);
	if (context === undefined) {
	  throw new Error('Something went wrong while trying to display your Nft')
	}
	return context
}

export function usePageEventContext() {
	const context = React.useContext(NftEventContextProvider);
	//console.log("✅ ~ NFT Event Stack Context After Request Finish ~ ", context);
	if (context === undefined) {
	  throw new Error('Something went wrong while trying to display your Nft')
	}
	return context
}

export function useAccountNftContext() {
	const context = React.useContext(AccountNftProvider);
	console.log("🆔 ~ Account NFT Stack Context After Request Finish ~ ", context);
	if (context === undefined) {
	  throw new Error('Something went wrong while trying to access your NFTs, please refresh the page')
	}
	return context
}

export function useNFTCacheProvider() {
	const context = React.useContext(NFTCacheProvider);
	//console.log("✅ ~ NFT Stack Context After Request Finish ~ ", context);
	if (context === undefined) {
	  throw new Error('Something went wrong while trying to display your Nft')
	}
	return context
}

export function useNFTEventCacheProvider() {
	const context = React.useContext(NFTEventCacheProvider);
	//console.log("✅ ~ NFT Stack Context After Request Finish ~ ", context);
	if (context === undefined) {
	  throw new Error('Something went wrong while trying to display your Nft')
	}
	return context
}