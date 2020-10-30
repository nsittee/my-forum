import React from 'react';

const authContext = React.createContext({
  authenticated: false,
  username: null,
  userSub: [],
});




export default authContext;
