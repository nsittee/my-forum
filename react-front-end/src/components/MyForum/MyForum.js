import React, { Component } from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import { Container } from '@material-ui/core'
class MyForum extends Component {
  state = {}

  render() {
    return (
      <div>
        <Header />
        <Container maxWidth="md">
          <Body />
        </Container>
      </div>
    )
  }
}


export default MyForum
