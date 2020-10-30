import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Button, TextField } from '@material-ui/core';
import { useCookies } from 'react-cookie';

import Logo from './logo.png';
import AuthContext from '../../context/auth-context';
import SignInDialog from './SignInDialog'
import UiContext from '../../context/ui-context';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const authContext = useContext(AuthContext)
  const { setSignIn } = useContext(UiContext)
  const [cookies, setCookie, removeCookie] = useCookies(['my-cookie'])
  const history = useHistory()

  const SignOutHandler = () => {
    removeCookie('tokenbon', {})
    history.go(0)
  }

  if (!authContext.authenticated)
    var headerStatus = [
      <Button onClick={() => setSignIn(true)}>Sign In </Button>,
      <Button onClick={() => { }}>Sign Up </Button>,
    ]
  else
    var headerStatus = [
      <Button>{authContext.username}</Button>,
      <Button onClick={SignOutHandler}>Sign Out</Button>,
    ]
  headerStatus.push(<Button href="/profile">Profile</Button>)
  headerStatus.push(<Button href="/setting">Setting</Button>)

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
          <TextField variant="outlined" size="small"></TextField>
          <Button color="secondary" variant="contained">Search</Button>

          {headerStatus}
          <SignInDialog />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;