import React, { useContext} from 'react';
import { PlasmicCanvasContext } from "@plasmicapp/loader-nextjs";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

export function MuiSubNav( {...props} ) {

  const inEditor = useContext(PlasmicCanvasContext);

  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    props.setpagevalue(value);
  };

  return (
        <AppBar {...props} position="static" {...(inEditor ? { disabled: true } : {})}>
          <Tabs value={props.pagevalue} onChange={handleChange} aria-label="sub page navigation tabs">
            {props.children}
          </Tabs>
        </AppBar>
  );
}