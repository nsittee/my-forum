import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Grid, Button, TextField } from '@material-ui/core'
import { useCookies } from 'react-cookie'

import AuthContext from '../../../context/auth-context'
import SignInDialog from './SignInDialog'
import SignUpDialog from './SignUpDialog'
import UiContext from '../../../context/ui-context'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const authContext = useContext(AuthContext)
  const { setSignIn, setSignUp } = useContext(UiContext)
  const removeCookie = useCookies(['my-cookie'])[2]
  const history = useHistory()

  const SignOutHandler = () => {
    removeCookie('tokenbon', {
      // If path is not set, the cookie cannot be removed outside of the root path
      path: '/'
    })
    history.go(0)
  }

  return (
    <AppBar position="sticky" elevation={0} color="secondary">
      <Toolbar>
        <Grid container>
          <a href="/">
            <img
              src="logo.png"
              alt='reddit'
              height='40' />
          </a>
          <TextField variant="outlined" size="small"></TextField>
          <div>

            <Button variant="contained" color="primary">Search</Button>
            {!authContext.authenticated ?
              <>
                <Button key="sign-in" onClick={() => setSignIn(true)}>Sign In </Button>
                <Button key="sign-up" onClick={() => setSignUp(true)}>Sign Up </Button>
              </>
              :
              <>
                <Button key="user">{authContext.username}</Button>
                <Button key="sign-out" onClick={SignOutHandler}>Sign Out</Button>
              </>
            }
            <Button key="profile" href="/profile">Profile</Button>
            <Button key="setting" href="/setting">Setting</Button>
            <Button key="changelog" href="/changelog">Changelog</Button>
          </div>

          <SignInDialog />
          <SignUpDialog />
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header