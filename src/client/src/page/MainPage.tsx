import React, { useEffect, useState, useContext } from 'react';
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
import AuthContext from '../context/auth-context';
import { defaultUser, IUser } from '../shared/model/user.model';

const MainPage = (props: any) => {
  const authContext = useContext(AuthContext)
  const [threads, setThreads] = useState<IThread[]>([])
  const [user, setUser] = useState<IUser>(defaultUser)
  const [subName] = useState<string>(props.match.params.sub ? props.match.params.sub : '')
  const [subId, setSubId] = useState<string>('')

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
    const fetchThreadData = () => {
      myAxios.get<IResponseEntity<ISub>>(`/api/subs/${subName}`)
        .then(res => {
          setThreads(res.data.data.SubThread!!)
          if (subName) setSubId(res.data.data._id!!) // SubId is use to check if user is a member or not
        })
        .catch(err => console.log(err))
    }
    const fetchUserData = async () => {
      try {
        const res = await myAxios.get<IResponseEntity<IUser>>(`/api/users/`, authContext.header)
        setUser(res.data.data!!)
      } catch (error) {
        console.log(error)
      }
    }
    if (authContext.authenticated) fetchUserData()
    fetchThreadData()
  }, [subName, authContext])

  return (
    <div>
      {/* only for /r/subName path */}
      {subName && <SubBanner subName={subName} subId={subId} user={user} />}
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
