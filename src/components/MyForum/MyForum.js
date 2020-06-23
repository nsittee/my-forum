import React, { Component } from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { Container } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from '../../context/auth-context'

class MyForum extends Component {
  state = {
    currentUser: null
  }

  onLoginListener = (event) => {
    this.setState({ currentSession: event.target[0].value })
  }

  render() {
    return (
      <AuthContext.Provider value={{
        currentUser: this.state.currentUser,
        loginHandler: this.onLoginListener
      }}>
        <div>
          <Header />
          <Container maxWidth="md">
            <Body isSignedIn={this.state.isSignedIn}></Body>
            <Footer />
          </Container>
        </div>
      </AuthContext.Provider>
    )
  }
}

export default MyForum
