import React from 'react';
import Login from './Login';
import Threads from '../../Threads/Threads';


const Body = (props) => {
  let body = null;

  if (props.isSignedIn) { // Signed in
    body = <Threads
      threads={props.threads}
      newThread={props.newThread}
      createModal={props.createModal}
    />;
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