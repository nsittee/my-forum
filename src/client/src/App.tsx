import jwt from 'jwt-decode'
import React, { useState } from 'react'

import AuthContext from './context/auth-context'
import UiContext from './context/ui-context'
import { AppRouter } from './AppRouter'
import Header from './components/layout/general/Header'
import { MuiThemeProvider, createTheme } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
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
    <MuiThemeProvider theme={AppTheme}>
      <div className="App">
        <BrowserRouter>
          <UiContext.Provider value={uiContextValue}>
            <AuthContext.Provider value={authContextValue}>
              <Header />
              <AppRouter />
            </AuthContext.Provider>
          </UiContext.Provider>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  )
}

const AppTheme = createTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#FFFFFF'
    },
  },
})

export default App
