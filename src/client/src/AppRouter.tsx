import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ChangelogPage from './page/ChangelogPage'
import ChatPage from './page/ChatPage'
import MainPage from './page/MainPage'
import ProfilePage from './page/ProfilePage'
import UserSettingPage from './page/UserSettingPage'
import { SubmitPage } from './page/SubmitPage'

export const AppRouter = () => {
  return (
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
  )
}
