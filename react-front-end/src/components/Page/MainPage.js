import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Axios from 'axios';

import Thread from '../Threads/Thread';
import ThreadDialog from '../Threads/ThreadDialog';
import NewThreadButton from '../Threads/NewThreadButton';

class MainPage extends Component {
  state = {
    subId: null,
    threads: [],
  }

  componentDidMount() {
    this.getContent();
  }

  getContent = () => {
    const subLongName = this.props.match.params.sub;
    var url = "http://localhost:5000/api/subs";
    if (subLongName) url += "/" + subLongName;

    console.log(url);

    Axios.get(url).then(res => {
      console.log(res.data.data);
      this.setState({ threads: res.data.data.SubThread });
      return;
    });
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

            <Route exact path='/r/:sub/:id' component={ThreadDialog} />
            {/* <Route exact path='/submit' component={NewThreadDialog} /> */}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default MainPage
