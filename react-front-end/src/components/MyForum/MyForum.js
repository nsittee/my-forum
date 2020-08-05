import React, { Component } from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { Container, Button } from '@material-ui/core'
import AuthContext from '../../context/auth-context'
import ThreadDialog from '../Threads/ThreadDialog'
import NewThreadDialog from '../Threads/NewThreadDialog'

class MyForum extends Component {
  state = {
    threads: [],
    currentUser: 'bon',
    isSignedIn: true,
  }

  debug = () => {
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
    )
  }
}


export default MyForum
