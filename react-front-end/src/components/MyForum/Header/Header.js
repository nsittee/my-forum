import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container, Grid, Button, Link } from '@material-ui/core'

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
              <Typography variant="h4" >
                <Link color="inherit" href="/">my-forum</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                <Link color="inherit" href="/profile">{headerName}</Link>
              </Button>
              <Button variant="contained" color="primary">
                <Link color="inherit" href="/setting">{headerName}</Link>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;