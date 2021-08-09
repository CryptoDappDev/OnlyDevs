import { Children, ComponentProps, useContext, useEffect, useState } from "react";
import { PlasmicCanvasContext } from "@plasmicapp/host";
import {
  ThemeProvider,
  ThemeOptions,
} from '@material-ui/core/styles';

import { createTheme } from '@material-ui/core/styles';

interface UsrTheme {
    theme: ThemeOptions
}

export function MuiTheme(
  props: UsrTheme, 
  data: ThemeOptions,

){
  const inEditor = useContext(PlasmicCanvasContext);
  const [usrTheme, setUsrTheme] = useState(createTheme(props.theme));
  
  useEffect(() => {
    //theme = createTheme(data);
    console.log("🚀 ~ file: MuiTheme.tsx ~ line 26 ~ useEffect ~ data", props.theme)
    setUsrTheme(createTheme(props.theme)) // eslint-disable-line
    console.log(data);
  }, [props]);

  return <ThemeProvider  {...props} theme={usrTheme} {...(inEditor ? { disabled: true } : {})}>
  
  </ThemeProvider>;
}