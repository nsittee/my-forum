import React from 'react';
import Thread from './Thread'
import Grid from '@material-ui/core/Grid';

const Threads = (props) => {
  let mainThreads = props.threads.map((thread) => {
    return <Thread
      key={thread.threadId}
      thread={thread}
      onThreadDialogClicked={props.onThreadDialogClicked}
      voteThreadHandler={props.voteThreadHandler} />
  })

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {mainThreads}
        </Grid>
      </Grid>
    </Grid >
  )
}



export default Threads;
