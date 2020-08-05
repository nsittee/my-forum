import React from 'react';
import { Grid } from '@material-ui/core';
import NewThreadButton from '../../Threads/NewThreadButton';
import Profile from './Profile';
import UserSetting from './UserSetting';
import { Route } from 'react-router-dom';
import MainThread from './MainThread';

const Body = (props) => {
  return (
    <div>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Route path="/" exact component={MainThread} />
          <Route path="/profile" component={Profile} />
          <Route path="/setting" component={UserSetting} />
        </Grid>
      </Grid >
      <br />
    </div>
  );
}


export default Body;