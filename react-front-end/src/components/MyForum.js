import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import { CookiesProvider, useCookies } from "react-cookie";
import jwt from 'jwt-decode';

import Header from './Layout/Header'
import MainPage from './Page/MainPage';
import ProfilePage from './Page/ProfilePage';
import UserSettingPage from './Page/UserSettingPage';
import SubmitPage from './Page/SubmitPage';
import ChangelogPage from './Page/ChangelogPage'
import AuthContext from '../context/auth-context';
import UiContext from '../context/ui-context'

const MyForum = () => {
  const [signIn, setSignIn] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [cookies] = useCookies('my-cookie')
  // const [cookies, setCookie, removeCookie] = useCookies()

  var authContextValue = {
    authenticated: false,
    id: '',
    username: '',
    userSub: []
  }
  if (cookies.connect) {
    const userData = jwt(cookies.connect)
    // console.log(userData)
    authContextValue.token = cookies.connect
    authContextValue.authenticated = true
    authContextValue.id = userData.id
    authContextValue.username = userData.username
    // FIXME: don't store userSub data in context, call the API instead
    authContextValue.userSub = userData.userSub
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
            <Switch>
              {/* Main routing each page */}
              <Route path="/profile" component={ProfilePage} />
              <Route path="/setting" component={UserSettingPage} />
              <Route path="/submit" component={SubmitPage} />
              <Route path="/changelog" component={ChangelogPage} />

              <Route path="/r/:sub" component={MainPage} />
              <Route path="/" component={MainPage} />
            </Switch>
          </AuthContext.Provider>
        </UiContext.Provider>
      </CookiesProvider>
    </div>
  );
}



export default MyForum
