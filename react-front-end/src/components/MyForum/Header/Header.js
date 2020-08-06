import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container, Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h4" >
                <Link to="/">my-forum</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" >
                <Link to="profile">profile</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" >
                <Link to="/setting">setting</Link>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;