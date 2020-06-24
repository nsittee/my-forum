import React, { Component } from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { Container } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from '../../context/auth-context'

class MyForum extends Component {
  state = {
    currentUser: null, 
    isSignedIn: true
  }

  onLoginListener = (event) => {
    let username = event.target[0].value
    let password = event.target[1].value
    if (username === 'bon' && password === 'bon') {
      this.setState({ currentUser: username })
      this.setState({ isSignedIn: true })
      alert('Welcome')
    } else {
      alert('Incorrect credential')
    }
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
