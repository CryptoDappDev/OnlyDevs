import React, { useContext } from 'react';
import { PlasmicCanvasContext } from "@plasmicapp/host";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export function MuiNavTab( 
    {...props}
) {

    const [value, setValue] = React.useState(0);
    const inEditor = useContext(PlasmicCanvasContext);
  
    return (
          <Tab {...props} {...(inEditor ? { disabled: true } : {})}> </Tab>
    );
  }