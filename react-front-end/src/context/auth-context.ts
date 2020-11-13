import React from 'react';

const authContext = React.createContext({
  id: '',
  username: '',
  authenticated: false,
  token: '',
  header: {}
});

export default authContext;
