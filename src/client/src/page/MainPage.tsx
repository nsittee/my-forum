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
import { IResponseEntity } from '../shared/response.model';
import { IThread } from '../shared/model/thread.model';
import { ISub } from '../shared/model/sub.model';

const MainPage = (props: any) => {
  const [threads, setThreads] = useState<IThread[]>([])
  const [subName] = useState<string>(props.match.params.sub ? props.match.params.sub : '')
  const [subId, setSubId] = useState<string>()

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
      myAxios.get<IResponseEntity<ISub>>(`/api/subs/${subName}`)
        .then(res => {
          const re = res.data
          setThreads(re.data.SubThread)

          // SubId is use to check if user is a member or not
          if (subName) setSubId(re.data._id)
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
