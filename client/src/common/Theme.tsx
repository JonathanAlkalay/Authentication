import { createTheme } from "@mui/material";

export const Theme = createTheme({
   palette :{
    primary: {
        main: "#6495ED"
    },
    secondary : {
        main: "#EE4B2B"
    },
    warning: {
        main: "#FF0000"
    },
    background: {
        default: "#D3D3D3",                  
    },
    text: {
        primary: "#301934",
        disabled: "#483248"
    }
   }
  });

  export type ComponentStyle = React.CSSProperties;