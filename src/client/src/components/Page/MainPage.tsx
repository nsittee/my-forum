import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import Axios from 'axios';

import Thread from '../Layout/Threads/Thread';
import ThreadDialog from '../Layout/Threads/ThreadDialog';
import CreateThread from '../Layout/Threads/CreateThread';
import ThreadFilter from '../Layout/Threads/ThreadFilter';
import SubBanner from '../Layout/Sub/SubBanner';
import appConstant from '../../constant/constant';

const MainPage = (props: any) => {
  const [threads, setThreads] = useState([])
  const [banner, setBanner] = useState(<div />)
  const [createPost, setCreatePost] = useState(<div />)
  const [contentFilter, setContentFilter] = useState(<div />)
  const [subName] = useState(props.match.params.sub)

  var mainThreads: Array<any> = [];
  mainThreads = threads.map((thread: any) => {
    return <Thread
      key={thread._id}
      thread={thread} />
  });

  useEffect(() => {
    const fetchData = () => {
      Axios.get(`${appConstant.URL}/api/subs/${subName ? subName : ''}`)
        .then(res => {
          console.log(res.data.data)
          setThreads(res.data.data.SubThread)
          setCreatePost(<CreateThread />)
          setContentFilter(<ThreadFilter />)
          if (subName) {
            console.log(res.data.data._id)
            setBanner(<SubBanner subName={subName} subId={res.data.data._id} />)
          }
        })
        .catch(err => console.log(err))
    }
    fetchData()
  }, [subName])

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
                {createPost}
              </Grid>

              <Grid item xs={12}>
                {contentFilter}
              </Grid>

              {mainThreads}
              <Route exact path='/r/:sub/:id' component={ThreadDialog} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default MainPage
