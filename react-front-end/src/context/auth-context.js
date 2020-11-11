import React from 'react';

const authContext = React.createContext({
  id: null,
  username: null,
  authenticated: false,
  token: '',
});

export default authContext;
