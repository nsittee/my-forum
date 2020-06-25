import React from 'react';
import Login from './Login';
import Threads from '../../Threads/Forums';


const Body = (props) => {
  let body = null;

  if (props.isSignedIn) { // Signed in
    body = <Threads />;
  } else {
    body = <Login />;
  }

  return (
    <div>
      <br />
      {body}
    </div>
  );
}

export default Body;