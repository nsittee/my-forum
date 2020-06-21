import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core'

const Header = (props) => {
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="h4" >Generic Forum</Typography>
          {/* <Typography variant="h6" align="right">by MUICT</Typography> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;