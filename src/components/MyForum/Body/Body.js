import React from 'react';
import Login from './Login';
import Forums from '../../Forums/Forums';
import Forum from '../../Forums/Forum';


const Body = (props) => {
  let body = null;

  if (props.isSignedIn) { // Signed in
    body = <Forums title={'XD'}/>;
  } else {
    body = <Login />;
  }

  return (
    <div>
      {body}
    </div>
  );
}

export default Body;