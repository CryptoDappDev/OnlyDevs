import React, { useContext, useEffect } from 'react';
import { PlasmicCanvasContext } from "@plasmicapp/host";
import Tab from '@material-ui/core/Tab';

export function MuiNavTab( {...props} ) {
  
  function a11yProps(index: any) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

  const inEditor = useContext(PlasmicCanvasContext);

  return (
    <Tab {...props} label={props.children} {...a11yProps(props.index)} {...(inEditor ? { disabled: true } : {})}> 
    </Tab>
  );
}