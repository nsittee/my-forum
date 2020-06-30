import React from 'react';
import Login from './Login';
import Threads from '../../Threads/Threads';
import { Grid } from '@material-ui/core';
import NewThreadButton from '../../Threads/NewThreadButton';


const Body = (props) => {
  let body = null;
  let newThread = null;
  if (props.isSignedIn) {
    body = <Threads threads={props.threads} onThreadDialogClicked={props.onThreadDialogClicked} />;
  } else {
    body = <Login />;
  }

  return (
    <div>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <NewThreadButton
            openCreateNewThread={props.openCreateNewThread}
            closeNewThreadModal={props.closeNewThreadModal} />
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