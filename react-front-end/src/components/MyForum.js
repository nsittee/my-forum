import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core'
import { CookiesProvider, useCookies } from "react-cookie";
import jwt from 'jwt-decode';

import Header from './Layout/Header'
import MainPage from './Page/MainPage';
import ProfilePage from './Page/ProfilePage';
import UserSettingPage from './Page/UserSettingPage';
import SubmitPage from './Page/SubmitPage';
import AuthContext from '../context/auth-context';
import UiContext from '../context/ui-context'
import uiContext from '../context/ui-context';
// import Login from '../components/Layout/Login'

const MyForum = () => {
  const [signIn, setSignIn] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['my-cookie'])

  var authContextValue = {
    authenticated: false,
    username: ''
  }
  if (cookies.tokenbon) {
    authContextValue.authenticated = true
    authContextValue.username = jwt(cookies.tokenbon).username
  }
  var uiContextValue = {
    signIn: signIn, setSignIn: setSignIn,
    signUp: signUp, setSignUp: setSignUp
  }

  return (
    <div>
      <CookiesProvider>
        <UiContext.Provider value={uiContextValue}>
          <AuthContext.Provider value={authContextValue}>
            <Header />
            <br />
            <Container maxWidth="md">
              <Switch>
                {/* Main routing each page */}
                <Route path="/profile" component={ProfilePage} />
                <Route path="/setting" component={UserSettingPage} />
                <Route path="/submit" component={SubmitPage} />

                <Route path="/r/:sub" component={MainPage} />
                <Route path="/" component={MainPage} />
              </Switch>
            </Container>
          </AuthContext.Provider>
        </UiContext.Provider>
      </CookiesProvider>
    </div>
  );
}



export default MyForum
