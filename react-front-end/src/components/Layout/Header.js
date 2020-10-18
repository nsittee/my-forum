import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Button } from '@material-ui/core';

import Logo from './logo.png';
import AuthContext from '../../context/auth-context';
import Login from './Login'
import UiContext from '../../context/ui-context';

const Header = () => {
  const authContext = useContext(AuthContext)
  const { signIn, setSignIn } = useContext(UiContext)

  let headerStatus = null
  if (!authContext.authenticated)
    headerStatus = <div>
      <Button onClick={() => setSignIn(true)}>
        Sign In </Button>
      <Button onClick={() => { }}>
        Sign Up </Button>
    </div >
  else headerStatus = <Button>{authContext.username}</Button>

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container>
          <a href="/">
            <img
              src={Logo}
              alt='reddit'
              height='40' />
          </a>
          <a href="/profile">Profile</a>
          <a href="/setting">Setting</a>
          {headerStatus}
          <Login />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}


export default Header;