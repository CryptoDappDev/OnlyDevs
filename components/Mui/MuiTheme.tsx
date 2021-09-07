//Imports
import { Children, ComponentProps, useContext, useEffect, useState } from "react";
import { PlasmicCanvasContext } from "@plasmicapp/loader-nextjs";
import {
  ThemeProvider,
  ThemeOptions,
} from '@material-ui/core/styles';

import { createTheme } from '@material-ui/core/styles';

//Delcaring Variables: Just need a Theme Options 
interface UsrTheme {
    theme: ThemeOptions
}

export function MuiTheme( props: UsrTheme ){
  //Always Needed for Plasmic Disable/Enable in editor
  const inEditor = useContext(PlasmicCanvasContext);

  //useState for Holding Value of Theme
  const [usrTheme, setUsrTheme] = useState(createTheme(props.theme));
  
  //Useffect: Everytime properties of this component change, Update Theme
  useEffect(() => {
    //theme = createTheme(data);
    //console.log("🚀 ~ file: MuiTheme.tsx ~ line 26 ~ useEffect ~ theme", props.theme)
    setUsrTheme(createTheme(props.theme))
  }, [props]);

  //Imported Material UI Theme Provider W/ Additonal Props to make work in editor
  return <ThemeProvider  {...props} theme={usrTheme} {...(inEditor ? { disabled: true } : {})}>
  </ThemeProvider>;
}