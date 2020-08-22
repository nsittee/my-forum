import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';

import Logo from './logo.png';

const Header = () => {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container>
          <Link to="/">
            <img
              src={Logo}
              alt='reddit'
              height='40' />
          </Link>
          <Grid item>
            <Link to="profile">profile</Link>
          </Grid>
          <Grid item>
            <Link to="/setting">setting</Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;