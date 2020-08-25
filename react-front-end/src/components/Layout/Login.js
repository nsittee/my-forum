import React, { useContext } from 'react';
import { TextField, Button } from '@material-ui/core';
import AuthContext from '../../context/auth-context'

const Login = () => {
  const context = useContext(AuthContext)

  return (
    <div>
      <form autoComplete="off" onSubmit={context.loginHandler}>
        <br />
        <TextField label="Username" />  <br />
        <TextField label="Password" type="password" /> < br /> <br />
        <Button
          type="submit"
          variant="contained"
          color="primary">Sign in </Button>
      </form>
    </div >
  )
}

export default Login;