import React, { useEffect, useState } from 'react';


export function BitCollapseBtn ({...props}) {

	/* Debug
	useEffect (() => {
		console.log("🚀 ~ file: BitCollapseBtn.tsx ~ line 9 ~ BitCollapse ~ props", props)
	},[props])
    */

	return (
		<div onClick={(e) => props.setOpen(!(open))} >
			{props.children}
		</div>
	);
}