import React, { useEffect, useState, useRef } from 'react';
import ReactTooltip from 'react-tooltip';

export function ToolTip({...props}) {

    let testRef : any = useRef();

    useEffect (() => {

		RemoveRightClick();

	},[props])

    //Remove Right Click!
		function RemoveRightClick() {
			setTimeout(() => {
				if(document.getElementById("HideRightClick") != null) {
					document.getElementById("HideRightClick")!.addEventListener('contextmenu', event => event.preventDefault());
				} else {
					RemoveRightClick();
				}
			}, 50);
		}

    return (
        <>
        <div 
            id="HideRightClick" 
            data-event="Na"
            ref={ref => testRef = ref} 
            onContextMenu={() => {ReactTooltip.show(testRef)}}  
            onClick={() => {ReactTooltip.hide(testRef)}} 
            data-tip="This is Fucking Insane" >Tooltip
        </div>
        <ReactTooltip 
				overridePosition={ (
					{ left, top },
					currentEvent, currentTarget, node) => {
						const d = document.documentElement;
						left = Math.min(d.clientWidth - node!.clientWidth, left);
						top = Math.min(d.clientHeight - node!.clientHeight, top);
						left = Math.max(0, left) + 500;
						top = Math.max(0, top) + 500;
						return { top, left }
					}			 
				} 
			/>
        </>
    )
}
    