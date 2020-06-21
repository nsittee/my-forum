import React from 'react';
import { TextField, Button } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import MainForum from './MainForum';


const Body = (props) => {
  let body = null;


  if (props.isSignedIn) { // Signed in
    body = MainForum();
  } else {
    body = Login();
  }

  return (
    <body>
      {body}
    </body>
  );
}

export default Body;