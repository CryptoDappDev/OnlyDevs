import React, { useContext, useEffect } from 'react';
import { PlasmicCanvasContext } from "@plasmicapp/host";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export function MuiNavPanel( {...props} ) {

  const inEditor = useContext(PlasmicCanvasContext);

  return (
    <div
      role="tabpanel"
      hidden={(props.pagevalue + 1) !== props.index}
      id={`simple-tabpanel-${props.index}`}
      aria-labelledby={`simple-tab-${props.index}`}
      {...props}
    >
      {(props.pagevalue + 1) === props.index && (
        <Box p={3}>
          <Typography>{props.children}</Typography>
        </Box>
      )}
    </div>
  );
}