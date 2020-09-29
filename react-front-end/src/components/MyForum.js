import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core'

import Header from './Layout/Header'
import MainPage from './Page/MainPage';
import ProfilePage from './Page/ProfilePage';
import UserSettingPage from './Page/UserSettingPage';
import SubmitPage from './Page/SubmitPage';
import AuthContext from '../context/auth-context';
import UiContext from '../context/ui-context'
import Login from '../components/Layout/Login'

const MyForum = () => {
  const uiContext = useContext(UiContext)
  let mainModal = null
  if (uiContext.showSignInDialog || true) mainModal = <Login />

  return (
    <div>
      <AuthContext.Provider value={{
        authenticated: false,
        username: "bonbon",
        signIn: signInHandler,
        signOut: signOutHandler
      }}>

        <Header />
        <br />
        {mainModal}
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
    </div>
  );
}

const signInHandler = (username, password) => {
  console.log(username + " " + password)
}
const signOutHandler = () => {

}


export default MyForum
