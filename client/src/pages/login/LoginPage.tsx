
import { useLazyLoginQuery } from "../../app-state/api-slices/auth-api/UsersApiSlice"

const Login = () => {
  const [login] = useLazyLoginQuery();
  const handleLogin = () =>{
    login({email: 'darth', password: 'vader'})
  }
  return (
    <div>
      <button style={{backgroundColor:'blue'}} onClick={handleLogin}></button>
      <h2>Log in</h2>  
    </div>
  )
}

export default Login