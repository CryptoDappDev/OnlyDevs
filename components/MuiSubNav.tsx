import React, { useContext } from 'react';
import { PlasmicCanvasContext } from "@plasmicapp/host";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export function MuiSubNav( 
    {...props}
) {

    const [value, setValue] = React.useState(0);
    const inEditor = useContext(PlasmicCanvasContext);
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };
  
    return (
        <AppBar position="static" {...(inEditor ? { disabled: true } : {})}>
          <Tabs {...props} value={value} onChange={handleChange} aria-label="sub page navigatioin tabs">
          </Tabs>
        </AppBar>
    );
  }