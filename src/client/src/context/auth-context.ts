import React from 'react';

const authContext = React.createContext({
  id: '',
  username: '',
  authenticated: false,
});

export default authContext;
