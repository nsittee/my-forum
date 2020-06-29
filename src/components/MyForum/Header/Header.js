import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core'

const Header = (props) => {
  let headerName = 'Please login';
  if (props.currentUser != null) {
    headerName = props.currentUser;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h4" >my-forum</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">{headerName}</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;