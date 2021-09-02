import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { TextField } from '@material-ui/core'
import { useCookies } from 'react-cookie'

import AuthContext from '../../../context/auth-context'
import SignInDialog from './SignInDialog'
import SignUpDialog from './SignUpDialog'
import UiContext from '../../../context/ui-context'
import { useHistory } from 'react-router-dom'
import { MyButton } from '../../common/MyButton'

const Header = () => {
  const authContext = useContext(AuthContext)
  const history = useHistory()
  const removeCookie = useCookies(['my-cookie'])[2]
  const { setSignIn, setSignUp } = useContext(UiContext)

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
        <a href="/"><img src="/logo.png" alt='reddit' height='40' /> </a>
        <TextField variant="outlined" size="small"></TextField>

        <MyButton variant="contained" color="primary">Search</MyButton>
        {!authContext.authenticated ?
          <>
            <MyButton key="sign-in" onClick={() => setSignIn(true)}>Sign In </MyButton>
            <MyButton key="sign-up" onClick={() => setSignUp(true)}>Sign Up </MyButton>
          </>
          :
          <>
            <MyButton key="user">{authContext.username}</MyButton>
            <MyButton key="sign-out" onClick={SignOutHandler}>Sign Out</MyButton>
            <MyButton key="chat" href="/chat">Chat</MyButton>
            <MyButton key="changelog" href="/changelog">Changelog</MyButton>
          </>
        }

        <SignInDialog />
        <SignUpDialog />
      </Toolbar>
    </AppBar>
  )
}

export default Header