import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MyForum from '../components/MyForum'
import { MuiThemeProvider } from '@material-ui/core'

import Theme from './MuiTheme'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MuiThemeProvider theme={Theme}>
          <MyForum />
        </MuiThemeProvider>
      </div>
    </BrowserRouter>
  )
}

export default App
