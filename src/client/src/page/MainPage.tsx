import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

import ThreadCard from '../components/layout/threads/ThreadCard';
import ThreadDialog from '../components/layout/threads/ThreadDialog';
import CreateThreadCard from '../components/layout/threads/CreateThreadCard';
import ThreadFilter from '../components/layout/threads/ThreadFilter';
import SubBanner from '../components/layout/sub/SubBanner';
import { Skeleton } from '@material-ui/lab';
import { myAxios } from '../config/axios-config';

const MainPage = (props: any) => {
  const [threads, setThreads] = useState([])
  const [subName] = useState(props.match.params.sub ? props.match.params.sub : '')
  const [subId, setSubId] = useState()

  var mainThreads: Array<any> = [];
  mainThreads = threads.map((thread: any) =>
    <Grid item xs={12} key={thread._id}>
      <ThreadCard
        key={thread._id}
        thread={thread} />
    </Grid>
  );
  var loaded = threads.length > 0

  useEffect(() => {
    const fetchData = () => {
      myAxios.get(`/api/subs/${subName}`)
        .then(res => {
          // console.log(res.data.data)
          setThreads(res.data.data.SubThread)

          if (subName) setSubId(res.data.data._id)
        })
        .catch(err => console.log(err))
    }
    fetchData()
  }, [subName])

  return (
    <div>
      {/* only for /r/subName path */}
      {subName && <SubBanner subName={subName} subId={subId} />}
      <Container maxWidth='md'>
        <Grid container spacing={1}>

          <Grid item xs={12}>
            {/* FIXME: Spacing for the main header */}
            <br />
            {loaded ? <CreateThreadCard /> : null}
          </Grid>

          <Grid item xs={12}>
            {loaded ?
              <ThreadFilter />
              :
              <Skeleton variant="rect" height={100} />
            }
          </Grid>

          {loaded ?
            mainThreads
            :
            <Grid item xs={12}>
              <Skeleton variant="rect" height={800} />
            </Grid>
          }
          <Route exact path='/r/:sub/:id' component={ThreadDialog} />
        </Grid>
      </Container>
    </div>
  )
}

export default MainPage
