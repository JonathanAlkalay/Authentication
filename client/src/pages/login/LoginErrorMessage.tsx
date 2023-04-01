import { Typography } from "@mui/material"
import { ComponentStyle } from "../../common/Theme"
import { Theme } from "../../common/Theme"

const styles = {
    mainContainer: {
      backgroundColor: Theme.palette.error.light,
      borderRadius: '4px',
      height: '50px',
      width: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'  
    } as ComponentStyle,
  }

export const LoginErrorMessage = () => {

    if(window.localStorage.getItem("isLoggedIn") === 'true' ) {
        return <></>
    }

    return (
        <div style={styles.mainContainer}>
            <Typography> Invalid Credentials </Typography>
        </div>
    )
}