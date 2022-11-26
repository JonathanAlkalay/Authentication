import { useLazyLoginQuery } from "../../app-state/api-slices/auth-api/UsersApiSlice";
import { makeStyles } from "tss-react/mui";
import { PrimaryButton } from "../../common/components/buttons/PrimaryButton";
import { TextField } from "@mui/material";

const useStyles = makeStyles()((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: "500px",
    width: "600px",
    color: "#301934",
    h2: {
      textAlign: "center"
    }
  },
  "input-div": {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "35px",
  },
  input: {
    width: "100%",
  },
  "primary-button": {
    margin: "0 50%",
    transform: "translate(-50%)"
  }
}));

const Login = () => {
  const { classes } = useStyles();
  const [login] = useLazyLoginQuery();
  const handleLogin = () => {
    login({ email: "darth", password: "vader" });
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2>Log in</h2>
        <div className={classes["input-div"]}>
          <TextField
            placeholder="enter your email"
            label="email"
            type="email"
            required
            variant="standard"
            className={classes.input}
          />
          <TextField
            placeholder="Enter your password"
            label="password"
            type="password"
            required
            variant="standard"
            className={classes.input}
          />
        </div>
        <PrimaryButton className={classes["primary-button"]} onClick={handleLogin}>Log in</PrimaryButton>
      </div>
    </div>
  );
};

export default Login;
