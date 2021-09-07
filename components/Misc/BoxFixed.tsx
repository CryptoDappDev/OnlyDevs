import React, { useEffect, useState } from 'react';

export function BoxFixed ({...props}) {

	return (
		<div className={props.className} style={{position:"fixed"}}>
			{props.children}
		</div>
	);
}
