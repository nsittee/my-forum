import React, { Component } from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { Container, Button } from '@material-ui/core'
import AuthContext from '../../context/auth-context'
import ThreadDialog from '../Threads/ThreadDialog'
import NewThreadDialog from '../Threads/NewThreadDialog'

class MyForum extends Component {
  state = {}

  render() {
    return (

      <div>
        <Header currentUser={this.state.currentUser} />
        <Container maxWidth="md">
          <Body
            threads={this.state.threads}
            onThreadDialogClicked={this.onThreadDialogClicked}
            openCreateNewThread={this.openCreateNewThread}
            closeNewThreadModal={this.closeNewThreadModal}
          />
          <Footer />
        </Container>
      </div>
    )
  }
}


export default MyForum
