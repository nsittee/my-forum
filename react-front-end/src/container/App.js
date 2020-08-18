import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import MyForum from '../components/MyForum'


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
