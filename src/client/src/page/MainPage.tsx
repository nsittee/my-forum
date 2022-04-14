import React, { useEffect, useState, useContext } from 'react'
import { Route } from 'react-router-dom'
import { Container, Grid } from '@material-ui/core'

import ThreadCard from '../components/layout/threads/ThreadCard'
import ThreadDialog from '../components/layout/threads/ThreadDialog'
import CreateThreadCard from '../components/layout/threads/CreateThreadCard'
import ThreadFilter from '../components/layout/threads/ThreadFilter'
import SubBanner from '../components/layout/sub/SubBanner'
import { Skeleton } from '@material-ui/lab'
import { myAxios } from '../config/axios-config'
import { IResponseEntity } from '../shared/response.model'
import { IThread } from '../shared/model/thread.model'
import { ISub } from '../shared/model/sub.model'
import AuthContext from '../context/auth-context'
import { defaultUser, IUser } from '../shared/model/user.model'
import UiContext from '../context/ui-context'

const MainPage = (props: any) => {
  const authContext = useContext(AuthContext)
  const uiContext = useContext(UiContext)
  const [threads, setThreads] = useState<IThread[]>([])
  const [user, setUser] = useState<IUser>(defaultUser)
  const [subId, setSubId] = useState<string>('')
  const [subName, setSubName] = useState<string>(props.match.params.sub ? props.match.params.sub : '')
  const [joined, setJoined] = useState(false)

  const joinHandler = () => {
    if (!subId || !authContext.authenticated) {
      uiContext.setSignIn(true)
      return
    }

    var url = `/api/subs/join?subId=${subId}`
    myAxios.put(url).then(res => {
      setJoined(true)
    }).catch(err => {
      console.log(err)
    })
  }

  const leaveHandler = () => {
    if (!subId || !authContext.authenticated) {
      uiContext.setSignIn(true)
      return
    }

    var url = `/api/subs/leave?subId=${subId}`
    myAxios.put(url).then(res => {
      setJoined(false)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const resp = await myAxios.get<IResponseEntity<IUser>>(`/api/users/`)
      setUser(resp.data.data!!)
    }
    const fetchThreadData = async () => {
      const resp = await myAxios.get<IResponseEntity<ISub>>(`/api/threads/from-sub/${subName}`)
      setSubId(resp.data.data!!._id!!)
      setThreads(resp.data.data.SubThread!!)
    }

    if (authContext.authenticated) {
      fetchUserData()
    }
    fetchThreadData()
  }, [])

  useEffect(() => {
    if (subName === '' || subId === '') return
    if (!authContext.authenticated) return
    const currentSub = (user.UserSub as ISub[]).find(_subId => _subId === subId)
    if (currentSub) setJoined(true)
  }, [subId, user])

  return (
    <div>
      {/* only for /r/subName path */}
      {subName &&
        <SubBanner
          subName={subName}
          joined={joined}
          joinHandler={joinHandler}
          leaveHandler={leaveHandler}
        />
      }
      <Container maxWidth='md'>
        <Grid container spacing={1}>

          <Grid item xs={12}>
            {/* FIXME: Spacing for the main header */}
            <br />
            {threads.length > 0 ? <CreateThreadCard /> : null}
          </Grid>

          <Grid item xs={12}>
            {threads.length > 0 ?
              <ThreadFilter />
              :
              <Skeleton variant="rect" height={100} />
            }
          </Grid>

          {threads.length > 0 ?
            threads.map((thread: any) =>
              <Grid item xs={12} key={thread._id}>
                <ThreadCard key={thread._id} thread={thread} />
              </Grid>
            )
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
