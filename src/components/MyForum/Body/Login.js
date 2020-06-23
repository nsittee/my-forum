import React, { useContext } from 'react';
import { TextField, Button } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AuthContext from '../../../context/auth-context'

const Login = (props) => {
  const context = useContext(AuthContext)

  return (
    <div>
      <form autoComplete="off" onSubmit={context.loginHandler}>
        <br />
        <TextField label="Username" />  <br />
        <TextField label="Password" type="password" /> < br /> <br />
        <Button type="submit" variant="contained" color="primary">Sign in</Button>
      </form>
    </div >
  )
}

export default Login;
