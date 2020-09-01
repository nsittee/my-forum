import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core'

import Header from './Layout/Header'
import MainThread from './Layout/MainThread';
import Profile from './Layout/Profile';
import UserSetting from './Layout/UserSetting';

class MyForum extends Component {

  render() {
    return (
      <div>
        <Header />
        <br />
        <Container maxWidth="md">
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/setting" component={UserSetting} />

            <Route exact path="/r/:sub" component={MainThread} />
            <Route exact path="/" component={MainThread} />
          </Switch>
        </Container>
      </div>
    )
  }
}


export default MyForum
