import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import Axios from 'axios';

import ThreadCard from '../components/layout/threads/ThreadCard';
import ThreadDialog from '../components/layout/threads/ThreadDialog';
import CreateThreadCard from '../components/layout/threads/CreateThreadCard';
import ThreadFilter from '../components/layout/threads/ThreadFilter';
import SubBanner from '../components/layout/sub/SubBanner';
import appConstant from '../constant/constant';

const MainPage = (props: any) => {
  const [threads, setThreads] = useState([])
  const [subName] = useState(props.match.params.sub ? props.match.params.sub : '')
  const [subId, setSubId] = useState()

  var mainThreads: Array<any> = [];
  mainThreads = threads.map((thread: any) => {
    return <ThreadCard
      key={thread._id}
      thread={thread} />
  });

  useEffect(() => {
    const fetchData = () => {
      Axios.get(`${appConstant.URL}/api/subs/${subName}`)
        .then(res => {
          console.log(res.data.data)
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
            <Grid container spacing={1}>

              <Grid item xs={12}>
                {/* FIXME: Spacing for the main header */}
                <br />
                {threads.length > 0 && <CreateThreadCard />}
              </Grid>

              <Grid item xs={12}>
                {threads.length > 0 && <ThreadFilter />}
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
