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
import { graphQlQueries } from '../graphql'

const MainPage = (props: any) => {
  const authContext = useContext(AuthContext)
  const uiContext = useContext(UiContext)
  const [threads, setThreads] = useState<IThread[]>([])
  const [user, setUser] = useState<IUser>(defaultUser)
  const [subId, setSubId] = useState<string>('')
  const [subName] = useState<string>(props.match.params.sub ? props.match.params.sub : '')
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
    const fetchUserAndThread = async () => {
      if (authContext.authenticated) {
        const userResp = await myAxios.get<IResponseEntity<IUser>>(`/api/users/`)
        setUser(userResp.data.data!!)
      }
      const threadResp = await myAxios.get<IResponseEntity<ISub>>(`/api/threads/from-sub/${subName}`)
      setSubId(threadResp.data.data!!._id!!)
      setThreads(threadResp.data.data.SubThread!!)
    }

    const fetchUserAndThreadGraphQl = async () => {
      const gql = {
        query: graphQlQueries.getAllThreadsAndUser,
        variables: {
          subName: subName === '' ? null : subName
        }
      }
      const resp = await myAxios.post(
        '/api/graphql',
        gql,
      )
      const user: IUser = resp.data.data.user
      const sub: ISub = resp.data.data.sub
      console.log({
        user,
        sub
      })
      setUser(user)
      setThreads(sub.SubThread!!)
      setSubId(sub._id!!)
    }

    // fetchUserAndThread()
    fetchUserAndThreadGraphQl()
  }, [subName, authContext.authenticated])

  useEffect(() => {
    if (subName === '' || subId === '') return
    if (!authContext.authenticated) return
    const currentSub = (user.UserSub as ISub[]).find(_subId => _subId._id === subId)
    if (currentSub) setJoined(true)
  }, [subId, user, subName, authContext])

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
            threads.map((thread: any, i) =>
              <Grid item xs={12} key={'thread-' + i}>
                <ThreadCard thread={thread} />
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
