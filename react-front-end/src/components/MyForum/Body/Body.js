import React from 'react';
import { Grid } from '@material-ui/core';
import Profile from './Profile';
import UserSetting from './UserSetting';
import { Route, Switch } from 'react-router-dom';
import MainThread from './MainThread';

const Body = () => {
  return (
    <div>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/setting" component={UserSetting} />
            <Route path="/" component={MainThread} />
          </Switch>
        </Grid>
      </Grid >
      <br />
    </div>
  );
}


export default Body;