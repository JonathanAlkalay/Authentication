
import { useLazyLoginQuery } from "../../app-state/api-slices/auth-api/UsersApiSlice"
import { makeStyles } from "tss-react/mui";
import { PrimaryButton } from "../../common/components/buttons/PrimaryButton";

const useStyles = makeStyles()((theme) => ({


}));




const Login = () => {
  const { classes } = useStyles();  
  const [login] = useLazyLoginQuery();
  const handleLogin = () =>{
    login({email: 'darth', password: 'vader'})
  }
  return (
    <div>
      <h2>Log in</h2>
      <PrimaryButton onClick={handleLogin}>hi</PrimaryButton>  
    </div>
  )
}

export default Login