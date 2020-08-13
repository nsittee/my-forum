import React, { Component } from 'react';
import axios from 'axios';
import Thread from '../../../components/Threads/Thread';
import { Grid } from '@material-ui/core';
import NewThreadDialog from '../../Threads/NewThreadDialog';
import ThreadDialog from '../../Threads/ThreadDialog';
import NewThreadButton from '../../Threads/NewThreadButton';
import { Route } from 'react-router-dom';

class MainThread extends Component {
  state = {
    threads: [],
    dialogNewThreadOn: false,
  }

  openCreateNewThread = () => {
    this.setState({ dialogNewThreadOn: true });
  }

  closeNewThreadModal = () => {
    this.setState({ dialogNewThreadOn: false });
  }

  onThreadDialogClicked = (id) => {
    this.props.history.push(`/${id}`);
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

  componentDidMount() {
    this.getContent();
  }

  getContent = () => {
    axios.get(`http://localhost:5000/api/threads`)
      .then(res => {
        console.log(res);
        this.setState({ threads: res.data });
        return;
      })
      .catch(err => console.log(err));
  }

  render() {
    let createDialog = null;
    let mainThreads = null;

    if (this.state.dialogNewThreadOn) {
      createDialog = <NewThreadDialog
        dialogNewThreadOn={this.state.dialogNewThreadOn}
        closeModal={this.closeNewThreadModal}
        submitNewThread={this.createNewThread}
      />
    }

    mainThreads = this.state.threads.map((thread) => {
      return <Thread
        key={thread._id}
        thread={thread}
        onThreadDialogClicked={this.onThreadDialogClicked} />
    });

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <NewThreadButton
              openCreateNewThread={this.openCreateNewThread}
              closeNewThreadModal={this.closeNewThreadModal} />
            {mainThreads}
            {createDialog}
            <Route exact path='/:id' component={ThreadDialog} />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default MainThread
