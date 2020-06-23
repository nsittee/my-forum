import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AuthContext from '../../../context/auth-context'

const onSubmitLogin = (event) => {
  alert(event)
}

class Login extends Component {
  static contextType = AuthContext;
  render() {
    // console.log(contextType);
    return (
      <div>
        <form autoComplete="off" onSubmit={onSubmitLogin}>
          <br />
          <TextField label="Username" />  <br />
          <TextField label="Password" type="password" /> < br /> <br />
          <Button type="submit" variant="contained" color="primary">Sign in</Button>
        </form>
      </div >
    )
  }
}

export default Login;
