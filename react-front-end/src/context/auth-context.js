import React from 'react';

const authContext = React.createContext({
  token: '',
  authenticated: false,
  id: null,
  username: null,
  userSub: [],
});




export default authContext;
