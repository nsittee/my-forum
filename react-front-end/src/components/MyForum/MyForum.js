import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { Container, Button } from '@material-ui/core'
import AuthContext from '../../context/auth-context'
import ThreadContext from '../../context/thread-context'
import ThreadDialog from '../Threads/ThreadDialog'
import NewThreadDialog from '../Threads/NewThreadDialog'

class MyForum extends Component {
  state = {
    threads: [],
    currentUser: 'bon',
    isSignedIn: true,

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
      threadId: oldThreadState.length,
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
    axios.get(`http://localhost:5000/threads`)
      .then(res => {
        this.setState({ threads: res.data });
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let threadDialog = null;
    let createDialog = null;

    if (this.state.dialogNewThreadOn) {
      createDialog = <NewThreadDialog
        dialogNewThreadOn={this.state.dialogNewThreadOn}
        closeModal={this.closeNewThreadModal}
        submitNewThread={this.createNewThread}
      />
    }
    if (this.state.dialogThreadKey != null) {
      var currentThread;
      const currentId = this.state.dialogThreadKey;
      for (const thread of this.state.threads) {
        if (currentId === thread._id) {
          console.log(thread._id);
          currentThread = thread;
          break;
        }
      }
      threadDialog = <ThreadDialog
        thread={currentThread}
        dialogThreadOn={this.state.dialogThreadOn}
        closeModal={this.closeModal}
        voteThreadHandler={this.voteThreadHandler}
      />
    }
    return (
      <ThreadContext.Provider value={{
        voteThreadHandler: this.voteThreadHandler
      }}>
        <AuthContext.Provider value={{
          currentUser: this.state.currentUser,
          loginHandler: this.onLoginListener
        }}>
          <div>
            <Header currentUser={this.state.currentUser} />
            <Container maxWidth="md">
              <Body
                isSignedIn={this.state.isSignedIn}
                threads={this.state.threads}
                onThreadDialogClicked={this.onThreadDialogClicked}
                openCreateNewThread={this.openCreateNewThread}
                closeNewThreadModal={this.closeNewThreadModal}
              />
              <Button
                onClick={this.debug}
                variant="contained"
                color="secondary"> Debug</Button>
              {threadDialog}
              {createDialog}

              <Footer />
            </Container>
          </div>
        </AuthContext.Provider>
      </ThreadContext.Provider>
    )
  }
}


export default MyForum
