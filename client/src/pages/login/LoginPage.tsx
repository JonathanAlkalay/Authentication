import { Typography } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useLazyLoginQuery } from "../../app-state/api-slices/auth-api/UsersApiSlice"
import { InputText } from "../../common/components/formik/TextInput";
import { PrimaryButton } from "../../common/components/non-formik/buttons/PrimaryButton";
import { SecondaryButton } from "../../common/components/non-formik/buttons/SecondaryButton";
import { ComponentStyle } from "../../common/Theme";
import { LoginErrorMessage } from "./LoginErrorMessage";


const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '80px',
    alignItems: 'center',
    marginTop: '280px'

  } as ComponentStyle,

  textInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '500px'

  } as ComponentStyle, 

  buttonContainer: {
    display: 'flex',
    gap: '14px'
  } as ComponentStyle
}

export const Login = () => {
  
  const [ logginAttempted, setLoginAttempted ] = useState<boolean>(false);

  const [ login ] = useLazyLoginQuery();

  const handleSubmit = ({ email, password }: FormikState) =>{
    login({ email, password });
  }

  return (
    <Formik<FormikState> enableReinitialize initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
      {({ dirty, submitForm, resetForm }) => {

        const onSubmit = () => {
          submitForm();
          setLoginAttempted(true);
        }
        
        return (
          <div style={styles.mainContainer}>
            
            <Typography> Welcome! Sign in to explore the app </Typography>

            {
              logginAttempted && <LoginErrorMessage/>
            }

            <div style={styles.textInputContainer}>
              <InputText label="Email" name="email"/>
              <InputText label="Password" name="password"/>
            </div>

            <div style={styles.buttonContainer}>
              <PrimaryButton disabled={!dirty} label="Submit" onClick={onSubmit}/>
              <SecondaryButton disabled={!dirty} label="Reset" onClick={resetForm}/>
            </div>

          </div>
        )
      }}
    </Formik>
  )
}

interface FormikState {
  email: string;
  password: string;
}