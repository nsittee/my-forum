import React from 'react';

const authContext = React.createContext({
  authenticated: false,
  username: null,
  signIn: () => { },
  signOut: () => { },
});




export default authContext;
