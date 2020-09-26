import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Axios from 'axios';

import Thread from '../Threads/Thread';
import ThreadDialog from '../Threads/ThreadDialog';
import NewThreadButton from '../Threads/NewThreadButton';


const MainPage = (props) => {
  const [threads, setThreads] = useState([])
  const [subName] = useState(props.match.params.sub)


  var mainThreads = null;
  mainThreads = threads.map((thread) => {
    return <Thread
      key={thread._id}
      thread={thread} />
  });

  const fetchThreadData = () => {
    var url = "http://localhost:5000/api/subs/" + (subName ? subName : ``)
    console.log(url)
    Axios.get(url).then(res => setThreads(res.data.data.SubThread))
  }

  useEffect(fetchThreadData, [])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <NewThreadButton />
          {mainThreads}

          <Route exact path='/r/:sub/:id' component={ThreadDialog} />
          {/* <Route exact path='/submit' component={NewThreadDialog} /> */}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MainPage
