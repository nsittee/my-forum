import React, { useContext, useState } from 'react'
import { Dialog, Card, CardContent, Typography } from '@material-ui/core'
import UiContext from '../../../context/ui-context'
import { Form } from 'react-final-form'
import { TextField } from 'mui-rff'
import { ValidationErrors } from 'final-form'
import { myAxios } from '../../../config/axios-config'
import { IResponseEntity } from '../../../shared/response.model'
import { IUser } from '../../../shared/model/user.model'
import { MyButton } from '../../common/MyButton'

interface SignUpFormModel {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpDialog = (props: any) => {
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const { signUp, setSignUp } = useContext(UiContext)

  const submitSignUp = (values: SignUpFormModel) => {
    myAxios.post<IResponseEntity<IUser>>('/api/users/signup', values)
      .then(resp => {
        setSubmitted(true)
        setErrorMessage(null)
      }).catch(err => {
        setSubmitted(true)
        setErrorMessage(err.response.data.message)
      })
  }

  const validateSignup = (values: SignUpFormModel): ValidationErrors => {
    let formtatus: any = {}

    if (!values.username) formtatus.username = "username cannot be empty"
    if (!values.email) formtatus.email = "email cannot be empty"
    if (!values.password) formtatus.password = "password cannot be empty"
    if (!values.confirmPassword) formtatus.confirmPassword = "confirmPassword cannot be empty"

    if (values.password && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        formtatus.password = "password is not matched"
        formtatus.confirmPassword = "password is not matched"
      }
    }

    return formtatus
  }

  return (
    <Dialog
      open={signUp}
      onClose={() => setSignUp(false)}
      transitionDuration={0}
      fullWidth={true} >
      <Card>
        <CardContent>
          {!submitted || errorMessage ?
            <>
              <Form
                onSubmit={submitSignUp}
                validate={validateSignup}
                render={props => (
                  <form onSubmit={props.handleSubmit} autoComplete="off">
                    <Typography>Username</Typography>
                    <TextField name="username" /> <br />

                    <Typography>Email</Typography>
                    <TextField name="email" type='email' /> <br />

                    <Typography>Password</Typography>
                    <TextField name="password" type="password" /> <br />

                    <Typography>Confirm Password</Typography>
                    <TextField name="confirmPassword" type="password" /> <br />
                    <br />
                    <MyButton type="submit" variant="contained" color="primary">
                      Register
                    </MyButton>
                  </form>
                )}
              />
              {
                errorMessage && <>
                  <Typography>Signup not successful</Typography>
                  <Typography>Reason: {errorMessage}</Typography>
                </>
              }
            </>
            :
            <Typography>Signup successful!!</Typography>
          }
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default SignUpDialog
