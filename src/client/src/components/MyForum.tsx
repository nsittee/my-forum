import jwt from 'jwt-decode'
import React, { useState } from 'react'

import AuthContext from '../context/auth-context'
import UiContext from '../context/ui-context'
import { AppRouter } from '../page/AppRouter'
import Header from './layout/general/Header'

const MyForum = () => {
  const [signIn, setSignIn] = useState(false)
  const [signUp, setSignUp] = useState(false)
  // const [cookies, setCookie, removeCookie] = useCookies()

  var authContextValue = {
    id: '',
    username: '',
    authenticated: false,
  }

  if (localStorage.getItem('a-token') && localStorage.getItem('b-token')) {
    try {
      // TODO: verify if jwt is still valid before continue
      const aToken = localStorage.getItem('a-token')!!
      const userData: any = jwt(aToken)
      authContextValue.id = userData.id
      authContextValue.username = userData.username
      authContextValue.authenticated = true
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
          <AppRouter />
        </AuthContext.Provider>
      </UiContext.Provider>
    </div>
  )
}

export default MyForum
