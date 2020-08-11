import React, { Component } from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import { Container } from '@material-ui/core'
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
        </Container>
      </div>
    )
  }
}


export default MyForum
