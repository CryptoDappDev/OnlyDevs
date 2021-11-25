import React, { useEffect, useState } from 'react';
import { useLottie, useLottieInteractivity } from "lottie-react";

import closeButton from './Modal/closeButton.json';
import confirmButton from './Modal/confirmButton.json';
import loadingDots from './Modal/loadingDots.json';
import moneyLottie from './Modal/money.json';
import cashLottie from './Modal/cash.json';
import noauthLottie from './Modal/noauth.json';
import MeemoLottie from './Meemo/Meemo.json';

const isURL = require('isurl');

export function LottieContainer({...props}) {

	const [lottieJSON, setLottieJSON] = useState <any>();

	/**
	 * Get Lottie Animation Data -> Pass to Wrapper
	 */
	useEffect (() => {
			
		//console.log("🚀 ~ file: Lottie.tsx ~ line 22 ~ Lottie ~ props", props);
		//console.log("🚀 ~ file: Lottie.tsx ~ line 23 ~ Lottie ImageFile ~ props", props.LottieImageFile)
		if(props.UrlLottie != true) {
			if(props.LottieImageFile == "Meemo") {
				setLottieJSON(MeemoLottie);
			}
			if(props.LottieImageFile == "LowEth") {
				setLottieJSON(moneyLottie);
			}
			if(props.LottieImageFile == "NoAuth") {
				setLottieJSON(noauthLottie);
			}
			if(props.LottieImageFile == "Dots") {
				setLottieJSON(loadingDots);
			}
			if(props.LottieImageFile == "ConfirmButton") {
				setLottieJSON(confirmButton);
			}
			if(props.LottieImageFile == "CloseButton") {
				setLottieJSON(closeButton);
			}
			if(props.LottieImageFile == "CashWallet") {
				setLottieJSON(cashLottie);
			}
		} else if (props.UrlLottie == true) {
			if(isURL(new URL(props.Url))) {
				let request = props.Url;
				//console.log("🚀 ~ file: Lottie.tsx ~ line 22 ~ Lottie ~ Getting Lottie from URL ... ", props.UrlLottie);
				if(props.UrlLottie == true) {
					fetch(request)
					.then(function (response) {
						return response.json();
					})
					.then(function(data) {

						if ((data != undefined) || (data != null)) {
							setLottieJSON(data);
						}
					});

				}
			}
		}
		//console.log("🚀 ~ file: Lottie.tsx ~ line 23 ~ Lottie ~ ", lottieJSON);

	},[props.LottieImageFile, props.UrlLottie, props.Url]);
	
		
	//Determine Type of Lottie Required Then Pass it to Lottie Wrapper
	function LottieWrapper ({...props}, LottieJSONWrapped:any) {

		const [lottieStyle, setLottieStyle] = useState<any>();
		const [ChildStyle, setChildStyle] = useState<any>();
		const [EventChildStyle, setEventChildStyle] = useState<any>();
		const [lottiePlay, setLottiePlay] = useState<any>();
		const [lottieClick, setLottieClick] = useState(1);
		const [direction, setDirection] = useState(1);

		//Start Here

		const options = {
			animationData : lottieJSON,
			loop : props.Loop,

			onDOMLoaded : handleOnLoaded,
			onLoopComplete : handleOnLoopComplete,
			onSegmentStart : handleOnSegmentStart,
		};

		const lottieObj = useLottie(options, lottieStyle);
		const Animation = useLottieInteractivity({
			lottieObj,
			mode: props.InteractionActionMode,
			actions: props.InteractionActions,
		});


		/**
		 * 
		 * Set Styles on Lottie and Children, Make them Separate so they dont fire all the time
		 */
		useEffect (() => {
			
			setLottieStyle(props.style);

		},[props.style]);
		useEffect (() => {
			
			setChildStyle(props.styleChildren);

		},[props.styleChildren]);
		useEffect (() => {

			setEventChildStyle(props.styleEventChildren);

		},[props.styleEventChildren]);

		/**
		 * 
		 * @param Actions Plasmic Editor Selected Series of Actions to Execute on Lottie
		 */
		function handleActions(Actions: any, key : any) {
			//console.log("🚀 ~  ~  ~  ~  LINE  ~  ~  BREAK  ~  ~  ~  ~ 🚀 ");
			//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ Im Testing Actions: ", Actions);
			//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ Im Testing Actions LENGTH: ", Object.keys(Actions).length);
			if ( key <  Object.keys(Actions).length ) {

				//Key
				//console.log("🚀 ~ " + key + " -> " + Object.keys(Actions)[key]);
				//Data
				//console.log("🚀 ~ " + key + " -> " + Actions[Object.keys(Actions)[key]] );
				
				let SearchKey : String =  Object.keys(Actions)[key]; 
				if(SearchKey.includes("-")) {
					SearchKey = SearchKey.split("-")[0];
				}

				//Lottie Functions
				if(SearchKey == "play") {

					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ This is a Play Action", Actions[Object.keys(Actions)[key]]);
					if( Actions[Object.keys(Actions)[key]] == true) { lottieObj.play(); setLottiePlay(!lottiePlay)}
					else if( Actions[Object.keys(Actions)[key]] == false) { lottieObj.pause(); setLottiePlay(!lottiePlay)}
					else if( Actions[Object.keys(Actions)[key]] == -1) { 
						if (lottiePlay == true) { lottieObj.pause() } 
						else if (lottiePlay != true) { lottieObj.play() }
						setLottiePlay(!lottiePlay)

					}
					key++;
					handleActions(Actions, key);
				} 
				
				else if (SearchKey == "wait") {
					
					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ This is a Wait Action", Actions[Object.keys(Actions)[key]]);
					setTimeout(() => { key++; handleActions(Actions, key)},Actions[Object.keys(Actions)[key]]);
				} 

				else if (SearchKey == "style") {
					
					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ This is a Style Action", Actions[Object.keys(Actions)[key]]);
					setLottieStyle(Actions[Object.keys(Actions)[key]]);
					key++;
					handleActions(Actions, key);
				} 
				else if (SearchKey == "style.child") {
					
					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ This is a Style Action", Actions[Object.keys(Actions)[key]]);
					setChildStyle(Actions[Object.keys(Actions)[key]]);
					key++;
					handleActions(Actions, key);
				} 
				else if (SearchKey == "style.eventchild") {
					
					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ This is a Style Action", Actions[Object.keys(Actions)[key]]);
					setEventChildStyle(Actions[Object.keys(Actions)[key]]);
					key++;
					handleActions(Actions, key);
				} 
				
				else if (SearchKey == "direction") {
					
					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ This is a Direction Action!", Actions[Object.keys(Actions)[key]]);
					if(Actions[Object.keys(Actions)[key]] == 0) { setDirection( ( direction * (-1) ) ) } 
						else { setDirection(Actions[Object.keys(Actions)[key]]) }

					if(direction == 1) { lottieObj.setDirection(direction) }
					if(direction == -1) {lottieObj.setDirection(direction) }
					key++;
					handleActions(Actions, key);
				}

				else if (SearchKey == "segments") {
					
					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ This is a Segment Action: ", Actions[Object.keys(Actions)[key]]);
					lottieObj.playSegments([ Actions[Object.keys(Actions)[key]][0], Actions[Object.keys(Actions)[key]][1] ], Actions[Object.keys(Actions)[key]][2]);
					key++;
					handleActions(Actions, key);
				} 

				else if (SearchKey == "speed") {
					
					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ This is a Speed Action: ", Actions[Object.keys(Actions)[key]]);
					lottieObj.setSpeed(Actions[Object.keys(Actions)[key]]);
					key++;
					handleActions(Actions, key);
				} 

				else if (SearchKey == "gotoplay") {
					
					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ This is a GotoPlay Action: ", Actions[Object.keys(Actions)[key]]);
					lottieObj.goToAndPlay(Actions[Object.keys(Actions)[key]], true);
					key++;
					handleActions(Actions, key);
				} 

				else if (SearchKey == "gotostop") {
					
					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleActions ~ This is a GotoStop Action: ", Actions[Object.keys(Actions)[key]]);
					lottieObj.goToAndStop(Actions[Object.keys(Actions)[key]], true);
					key++;
					handleActions(Actions, key);
				} 
			}
		}

		//Interaction Methods
		function handleClick() {

			console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleHover ~ This is a click event: ", lottieClick);

			
			if(lottieClick == 1) {
				if(props.ActionsClick2Used == true) {
					setLottieClick(2);
				} else if(props.ActionsClick3Used == true) {
					setLottieClick(3);
				} else { setLottieClick(1) }
				//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleHover ~ I Have Been Clicked Once!");
				if(props.ActionsClick != null && props.ActionsClick != undefined) { handleActions( props.ActionsClick, 0 ) }
			}
			
			else if (lottieClick == 2) { 
				if(props.ActionsClick3Used == true) {
					setLottieClick(3);
				} else {
					setLottieClick(1);
				}
				if(props.ActionsClick2Used == true) {
					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleHover ~ I Have Been Clicked Twice!");
					if(props.ActionsClick2 != null && props.ActionsClick2 != undefined) { handleActions( props.ActionsClick2, 0 ) }
				}	
			}
			
			else if (lottieClick == 3) { 
				setLottieClick(1);
				if(props.ActionsClick3Used == true) {
					//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleHover ~ I Have Been Clicked Three Times!");
					if(props.ActionsClick3 != null && props.ActionsClick3 != undefined) { handleActions( props.ActionsClick3, 0 ) }
				}
			}
		}
		function handleDoubleClick() {

			//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleHover ~ I Have Been Clicked TWICE!");
			if(props.ActionsDoubleClick != null && props.ActionsDoubleClick != undefined) { handleActions( props.ActionsDoubleClick, 0 ) }
		}
		function handleHover() {

			//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleHover ~ Im Hovering!");
			if(props.ActionsMouseEnter != null && props.ActionsMouseEnter != undefined) { handleActions( props.ActionsMouseEnter, 0 ) }
		}
		function handleLeave() {

			//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleHover ~ Im NOT Hovering!");
			if(props.ActionsMouseLeave != null && props.ActionsMouseLeave != undefined) { handleActions( props.ActionsMouseLeave, 0 ) }
		}
		function handleMouseDown() {

			//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleHover ~ I ONLY CLICKED!");
			if(props.ActionsClickDown != null && props.ActionsClickDown != undefined) { handleActions( props.ActionsClickDown, 0 ) }
		}
		function handleMouseUp() {

			//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleHover ~ Im DONE CLICKING!");
			if(props.ActionsClickUp != null && props.ActionsClickUp != undefined) { handleActions( props.ActionsClickUp, 0 ) }
		}
		function handleOnLoopComplete() {

			//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleOnLoopComplete");
			if(props.OnLoopComplete != null && props.OnLoopComplete != undefined) { handleActions( props.OnLoopComplete, 0 ) }
		}
		function handleOnSegmentStart() {

			console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleOnSegmentStart");
			if(props.OnSegmentStart != null && props.OnSegmentStart != undefined) { handleActions( props.OnSegmentStart, 0 ) }
		}
		function handleOnLoaded() {

			//console.log("🚀 ~ file: LottieContainer.tsx ~ line 52 ~ handleOnLoaded");
			setLottiePlay(props.Autoplay);
			if(props.OnLoaded != null && props.OnLoaded != undefined) { handleActions( props.OnLoaded, 0 ) }
		}
		
		return (
			<div className={props.className}>
				<div
					onMouseOver={handleHover}  
					onMouseLeave={handleLeave}
					onDoubleClick={handleDoubleClick}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onClick={handleClick}
					>
						{Animation}
						<div style={EventChildStyle}>
							{(props.DisplayEventChildren == true) && <>{props.eventChildren}</>}
						</div>
				</div>
				<div style={ChildStyle}>
					{(props.DisplayChildren == true) && <>{props.children}</>}
				</div>
			</div>
		);
	}

	return (
		<LottieWrapper {...props} LottieJSON={lottieJSON} />
	)
}
