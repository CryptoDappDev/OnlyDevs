//Imports
import { useContext, useEffect, useState } from "react";
import { PlasmicCanvasContext } from "@plasmicapp/loader-nextjs";

import { ThemeProvider } from '@material-ui/core/styles';

import { createTheme } from '@material-ui/core/styles';

import { Button as MuiBtn } from "@material-ui/core";


export function MuiButton({...props}){
  //Always Needed for Plasmic Disable/Enable in editor
  const inEditor = useContext(PlasmicCanvasContext);

  //useState for Holding Value of Theme
  const [usrTheme, setUsrTheme] = useState(createTheme(props.theme));
  //setUsrTheme(createTheme({"palette":{"common":{"black":"#000","white":"#fff"},"background":{"paper":"#fff","default":"#fafafa"},"primary":{"light":"#7986cb","main":"#3f51b5","dark":"#303f9f","contrastText":"#fff"},"secondary":{"light":"#ff4081","main":"#f50057","dark":"#c51162","contrastText":"#fff"},"error":{"light":"#e57373","main":"#f44336","dark":"#d32f2f","contrastText":"#fff"},"text":{"primary":"rgba(0, 0, 0, 0.87)","secondary":"rgba(0, 0, 0, 0.54)","disabled":"rgba(0, 0, 0, 0.38)","hint":"rgba(0, 0, 0, 0.38)"}}}));


  //Useffect: Everytime theme of this component change, Update Theme
  useEffect(() => {
    //theme = createTheme(data);
    //console.log("🚀 ~ file: MuiButton.tsx ~ line 26 ~ useEffect ~ theme", props.theme)
    
    if (!(createTheme(props.theme) === usrTheme)) {
      setUsrTheme(createTheme(props.theme))
    }
  }, [props.theme]);

  return (
    <div className={props.className}>
      <ThemeProvider  {...props} theme={usrTheme} {...(inEditor ? { disabled: true } : {})}>
        <MuiBtn variant={props.variant} href={props.href} color={props.color} >
          {props.children}
        </MuiBtn> 
      </ThemeProvider>
    </div>
  )
}