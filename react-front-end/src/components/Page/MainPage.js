import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Axios from 'axios';

import Thread from '../Threads/Thread';
import ThreadDialog from '../Threads/ThreadDialog';
import NewThreadButton from '../Threads/NewThreadButton';


const MainPage = (props) => {
  const [threads, setThreads] = useState([])
  var mainThreads = null;
  mainThreads = threads.map((thread) => {
    return <Thread
      key={thread._id}
      thread={thread} />
  });

  useEffect(() => {
    const fetchDate = async () => {
      const subLongName = props.match.params.sub;
      var url = "http://localhost:5000/api/subs";
      if (subLongName) url += "/" + subLongName;

      await Axios.get(url).then(res => {
        console.log(res.data.data);
        setThreads(res.data.data.SubThread)
      });
    }
    fetchDate()
  }, [])

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
