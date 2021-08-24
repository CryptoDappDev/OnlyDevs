import React, { useEffect, useState } from 'react';

//Bit.dev import -> Ts wont complie unless ignored any type
// @ts-ignore
import MetamaskLogo from '@bit/lil.baseth.metamask-logo';


export function BitMetaMaskLogo ({...props}) {

	return (
		<MetamaskLogo/>
	);
}
