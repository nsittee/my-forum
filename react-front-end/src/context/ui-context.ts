import React from 'react'

export default React.createContext({
  signIn: false,
  setSignIn: (value: boolean) => { },

  signUp: false,
  setSignUp: (value: boolean) => { }
})