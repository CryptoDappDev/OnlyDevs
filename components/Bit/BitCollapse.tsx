import React, { useEffect, useState } from 'react';

//Bit.dev import -> Ts wont complie unless ignored any type
// @ts-ignore
import { Collapsible } from '@bit/grommet.grommet.collapsible';


export function BitCollapse ({...props}) {

	const [open, setOpen] = useState(false);

	return (
		<div className={props.className}>

			<div onClick={(e) => setOpen(!(open))} >
				{props.button}
			</div>
			{props.show === true && 

				<Collapsible direction={props.direction} open={true}>
					{props.children}
        		</Collapsible>
			}
			{props.show === false && 

				<Collapsible direction={props.direction} open={open}>
					{props.children}
				</Collapsible>
			}
		</div>
	);
}
