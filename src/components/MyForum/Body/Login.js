import React from 'react';
import { TextField, Button } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function Login() {
  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField label="Username" /> <br />
        <TextField label="Password" type="password" /> < br /> <br />
        <Button variant="contained" color="primary">Sign in</Button>
      </form>
    </div>
  )
}

export default Login;
