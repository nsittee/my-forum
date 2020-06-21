import React from 'react';
import Header from '../components/MyForum/Header/Header'
import Body from '../components/MyForum/Body/Body'
import Footer from '../components/MyForum/Footer/Footer'
import { Container } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import MyForum from '../components/MyForum/MyForum'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyForum />
      </div>
    </BrowserRouter>
  );
}

export default App;
