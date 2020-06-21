import React, { Component } from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { Container } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'


class MyForum extends Component {
  state = {
    isSignedIn: false
  }

  render() {
    return (
      <div>
        <Header></Header>
        <Container maxWidth="md">
          <Body isSignedIn={this.state.isSignedIn}></Body>
          <Footer></Footer>
        </Container>
      </div>
    )
  }
}

export default MyForum
