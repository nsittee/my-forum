import React, { Component } from 'react'
import axios from 'axios';
import Thread from '../../../components/Threads/Thread';
import { Grid } from '@material-ui/core';

class MainThread extends Component {
  state = {
    threads: [],

    dialogThreadOn: false,
    dialogThreadKey: null,
    dialogNewThreadOn: false,
  }

  debug = () => {
  }

  voteThreadHandler = (e, thread, vote) => {
    e.stopPropagation();
    const index = thread._id;
    let newThreads = [...this.state.threads];
    let newThread = { ...this.state.threads[index] };

    if (vote === 'up') newThread.upVote++;
    else if (vote === 'down') newThread.downVote++;

    newThreads[index] = newThread;
    this.setState({
      threads: newThreads
    })
  }

  openCreateNewThread = () => {
    this.setState({ dialogNewThreadOn: true });
  }

  closeNewThreadModal = () => {
    this.setState({ dialogNewThreadOn: false });
  }

  onThreadDialogClicked = (id) => {
    this.setState({ dialogThreadOn: true });
    this.setState({ dialogThreadKey: id });
  }

  closeModal = () => {
    this.setState({ dialogThreadOn: false });
    this.setState({ dialogThreadKey: null });
  }

  createNewThread = (event) => {
    event.preventDefault();
    const title = event.target[0].value;
    const content = event.target[1].value;
    const date = new Date();
    const isoDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    let oldThreadState = this.state.threads;
    let newThreads = {
      _id: oldThreadState.length,
      threadTitle: title,
      subRedditId: 0,
      subReddit: 'TIFU',
      content: content,
      author: this.state.currentUser,
      published: {
        date: isoDate,
        time: time
      },
      upVote: 0,
      downVote: 0,
      comments: null
    };
    oldThreadState.push(newThreads);
    this.setState({ newThreads: oldThreadState });
    event.target.reset();
    this.setState({ dialogNewThreadOn: false })
  }

  onLoginListener = (event) => {
    event.preventDefault();
    let username = event.target[0].value;
    let password = event.target[1].value;
    if (username === 'bon' && password === 'bon') {
      this.setState({ currentUser: username });
      this.setState({ isSignedIn: true });
      // alert('Welcome');
    } else {
      alert('Incorrect credential');
    }
  }

  componentDidMount() {
    this.getContent();
  }

  getContent = () => {
    axios.get(`http://localhost:5000/api/threads`)
      .then(res => {
        this.setState({ threads: res.data });
        console.log(this.state.threads);
        return;
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let mainThreads = this.state.threads.map((thread) => {
      return <Thread
        key={thread._id}
        thread={thread}
        onThreadDialogClicked={this.onThreadDialogClicked} />
    });

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {mainThreads}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default MainThread
