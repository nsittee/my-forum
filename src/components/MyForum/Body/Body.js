import React from 'react';
import Login from './Login';
import Threads from '../../Threads/Threads';
import { Grid } from '@material-ui/core';
import NewThread from '../../Threads/NewThread';


const Body = (props) => {
  let body = null;
  let newThread = null;
  if (props.isSignedIn) { // Signed in
    newThread = <NewThread newThread={props.newThread} />;
    body = <Threads threads={props.threads} createModal={props.createModal} />;
  } else {
    body = <Login />;
  }

  return (
    <div>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {newThread}
        </Grid>
        <Grid item xs={12}>
          {body}
        </Grid>
      </Grid >
      <br />
    </div>
  );
}


export default Body;