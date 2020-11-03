import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import Axios from 'axios';

import Thread from '../Layout/Threads/Thread';
import ThreadDialog from '../Layout/Threads/ThreadDialog';
import CreatePost from '../Layout/CreatePost';
import ContentFilter from '../Layout/ContentFilter';
import SubBanner from '../Layout/SubBanner';


const MainPage = (props) => {
  const [threads, setThreads] = useState([])
  const [banner, setBanner] = useState()
  const [subName] = useState(props.match.params.sub)

  var mainThreads = null;

  mainThreads = threads.map((thread) => {
    return <Thread
      key={thread._id}
      thread={thread} />
  });

  const fetchThreadData = () => {
    var url = 'http://localhost:5000/api/subs/'
    if (subName) {
      url += subName

      // Banner only display for the '/r/sub-name' path
      setBanner(<SubBanner subName={subName} />)
    }
    console.log(url)
    Axios.get(url)
      .then(res =>
        setThreads(res.data.data.SubThread)
      )
      .catch(err => console.log(err))
  }

  useEffect(fetchThreadData, [])

  return (
    <div>
      {/* only for /r/subName path */}
      {banner}
      <Container maxWidth='md'>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1}>

              <Grid item xs={12}>
                {/* FIXME: Spacing for the main header */}
                <br />
                <CreatePost />
              </Grid>

              <Grid item xs={12}>
                <ContentFilter />
              </Grid>

              {mainThreads}
              <Route exact path='/r/:sub/:id' component={ThreadDialog} />
              {/* <Route exact path='/submit' component={NewThreadDialog} /> */}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default MainPage
