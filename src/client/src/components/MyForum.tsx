import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import jwt from 'jwt-decode'

import Header from './layout/general/Header'
import MainPage from '../page/MainPage'
import ProfilePage from '../page/ProfilePage'
import UserSettingPage from '../page/UserSettingPage'
import SubmitPage from '../page/SubmitPage'
import ChangelogPage from '../page/ChangelogPage'
import AuthContext from '../context/auth-context'
import UiContext from '../context/ui-context'
import ChatPage from '../page/ChatPage'

const MyForum = () => {
  const [signIn, setSignIn] = useState(false)
  const [signUp, setSignUp] = useState(false)
  // const [cookies, setCookie, removeCookie] = useCookies()

  var authContextValue = {
    id: '',
    username: '',
    authenticated: false,
    token: '',
    header: {}
  }

  if (localStorage.getItem('a-token') && localStorage.getItem('b-token')) {
    try {
      const aToken = localStorage.getItem('a-token')!!
      const userData: any = jwt(aToken)
      authContextValue.id = userData.id
      authContextValue.username = userData.username
      authContextValue.authenticated = true
      authContextValue.token = aToken
      authContextValue.header = { headers: { authorization: aToken } }
    } catch (err) {
      localStorage.clear()
    }
  } else {
    localStorage.clear()
  }
  var uiContextValue = {
    signIn: signIn, setSignIn: (value: boolean) => setSignIn(value),
    signUp: signUp, setSignUp: (value: boolean) => setSignUp(value)
  }

  return (
    <div>
      <UiContext.Provider value={uiContextValue}>
        <AuthContext.Provider value={authContextValue}>
          <Header />
          <Switch>
            {/* Main routing each page */}
            <Route path="/profile" component={ProfilePage} />
            <Route path="/setting" component={UserSettingPage} />
            <Route path="/submit" component={SubmitPage} />
            <Route path="/changelog" component={ChangelogPage} />
            <Route path="/chat" component={ChatPage} />

            <Route path="/r/:sub" component={MainPage} />
            <Route path="/" component={MainPage} />
          </Switch>
        </AuthContext.Provider>
      </UiContext.Provider>
    </div>
  )
}



export default MyForum
