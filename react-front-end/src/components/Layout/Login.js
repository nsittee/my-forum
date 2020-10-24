import React, { useContext, useState } from 'react';
import { TextField, Button, Dialog } from '@material-ui/core';
import Axios from 'axios';

import AuthContext from '../../context/auth-context'
import UiContext from '../../context/ui-context'

const Login = (props) => {
  const [username, setUsername] = useState('bonbonpostman')
  const [password, setPassword] = useState('passwordXD')

  const context = useContext(AuthContext)
  const { signIn, setSignIn } = useContext(UiContext)

  return (
    <Dialog
      open={signIn}
      onBackdropClick={() => setSignIn(false)}
      onEscapeKeyDown={() => setSignIn(false)}
      transitionDuration={0}
      maxWidth='lg'
      fullWidth={true} >
      <div>
        <form autoComplete="off" onSubmit={context.loginHandler}>
          <br />
          <TextField
            label="Username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <br />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          < br /> <br />
          <Button
            variant="contained"
            onClick={event => submitLogin(event, username, password)}
            color="primary">
            Sign in
              </Button>
        </form>
      </div >
    </Dialog>
  )
}

const submitLogin = (event, username, password) => {
  console.log(`Submit info is ${username} with ${password}`)
  const data = {
    username: username,
    password: password
  }
  const url = 'http://localhost:5000/api/users/signin'
  Axios.post(url, data).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
export default Login;
