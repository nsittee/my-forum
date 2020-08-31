import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Axios from 'axios';

import Thread from '../Threads/Thread';
import NewThreadDialog from '../Threads/NewThreadDialog';
import ThreadDialog from '../Threads/ThreadDialog';
import NewThreadButton from '../Threads/NewThreadButton';

class MainThread extends Component {
  state = {
    threads: [],
  }

  componentDidMount() {
    this.getContent();
  }

  getContent = () => {
    Axios.get(`http://localhost:5000/api/subs/home`)
      .then(res => {
        console.log(res);
        this.setState({ threads: res.data });
        return;
      })
      .catch(err => console.log(err));
  }

  render() {
    let mainThreads = null;

    mainThreads = this.state.threads.map((thread) => {
      return <Thread
        key={thread._id}
        thread={thread} />
    });

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <NewThreadButton />
            {mainThreads}

            <Route exact path='/:id' component={ThreadDialog} />
            <Route exact path="/create" component={NewThreadDialog} />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default MainThread
