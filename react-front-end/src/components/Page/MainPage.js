import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import Axios from 'axios';

import Thread from '../Layout/Threads/Thread';
import ThreadDialog from '../Layout/Threads/ThreadDialog';
import CreatePost from '../Layout/CreatePost';
import ContentFilter from '../Layout/ContentFilter';
import SubBanner from '../Layout/SubBanner';
import AuthContext from '../../context/auth-context'


const MainPage = (props) => {
  const [threads, setThreads] = useState([])
  const [banner, setBanner] = useState()
  const [subId, setSubId] = useState()
  const [createPost, setCreatePost] = useState()
  const [contentFilter, setContentFilter] = useState()
  const [subName] = useState(props.match.params.sub)

  const authContext = useContext(AuthContext)

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
      setBanner(
        <SubBanner subName={subName}
          subId={subId}
          userSub={authContext.userSub} />
      )
    }
    console.log(url)
    Axios.get(url, { withCredentials: true })
      .then(res => {
        setSubId(res.data.data._id)
        setThreads(res.data.data.SubThread)
        setCreatePost(<CreatePost />)
        setContentFilter(<ContentFilter />)
        if (subName) {
          console.log(res.data.data._id)
          setBanner(
            <SubBanner subName={subName}
              subId={res.data.data._id}
              userSub={authContext.userSub} />
          )
        }

      })
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
