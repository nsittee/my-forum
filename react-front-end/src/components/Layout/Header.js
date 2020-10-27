import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Button } from '@material-ui/core';
import { useCookies } from 'react-cookie';

import Logo from './logo.png';
import AuthContext from '../../context/auth-context';
import SignInDialog from './SignInDialog'
import UiContext from '../../context/ui-context';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const authContext = useContext(AuthContext)
  const { signIn, setSignIn } = useContext(UiContext)
  const [cookies, setCookie, removeCookie] = useCookies(['my-cookie'])
  const history = useHistory()

  if (!authContext.authenticated)
    var headerStatus = <div>
      <Button onClick={() => setSignIn(true)}>Sign In </Button>
      <Button onClick={() => { }}>Sign Up </Button>
    </div >
  else
    var headerStatus = <div>
      <Button>{authContext.username}</Button>
      <Button onClick={() => SignOutHandler(removeCookie, history)}>Sign Out</Button>
    </div>

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
          <SignInDialog />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

const SignOutHandler = (removeCookie, history) => {
  removeCookie('tokenbon', {})
  history.go(0)
}


export default Header;