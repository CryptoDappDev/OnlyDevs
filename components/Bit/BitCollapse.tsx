import React, { useEffect, useState } from 'react';

//Bit.dev import -> Ts wont complie unless ignored any type
// @ts-ignore
import { Collapsible } from '@bit/grommet.grommet.collapsible';


export function BitCollapse ({...props}) {

	const [open, setOpen] = useState(false);

	const childrenWithExtraProp = React.Children.map(props.children, child =>
	  React.cloneElement(child, { setOpen: setOpen, open: open , ...child.props})
	);

	return (
		<div className={props.className}>
			{ props.show === true && 
				<Collapsible direction={props.direction} open={true}>
					{childrenWithExtraProp}
				</Collapsible>
			}
			{ props.show === false && 
				<>
					{ open === false &&
						<div onClick={(e) => setOpen(!(open))} >
							{props.button}
						</div>
					}
					
					{ open === true &&
						<Collapsible direction={props.direction} open={open}>
							{childrenWithExtraProp}
						</Collapsible>
					}
				</>
			}
		</div>
	);
}