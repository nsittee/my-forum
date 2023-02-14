import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ChangelogPage from './ChangelogPage'
import ChatPage from './ChatPage'
import MainPage from './MainPage'
import ProfilePage from './ProfilePage'
import SubmitPage from './SubmitPage'
import UserSettingPage from './UserSettingPage'

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
