import React, { Component } from 'react';
import { Card, Grid, Container, Typography, CardContent, Dialog } from '@material-ui/core';
import Axios from 'axios';

class ThreadDialog extends Component {
  state = {
    thread: null,
  }

  getThread = (id) => {
    Axios.get(`http://localhost:5000/api/threads/${id}`)
      .then(res => {
        this.setState({ thread: res.data });
      })
      .catch(err => console.log(err));
  }

  componentDidMount = () => {
    this.getThread(this.props.match.params.id);
  }

  render() {
    let threadDialog = null;
    if (this.state.thread) {
      const thread = this.state.thread;

      threadDialog =
        <Dialog
          open={true}
          onBackdropClick={() => this.props.history.goBack()}
          onEscapeKeyDown={() => this.props.history.goBack()}
          transitionDuration={0}
          maxWidth='lg'
          fullWidth={true} >
          <Container>
            <Grid container alignContent='center'>
              <Grid item xs={12}>
                < br /> <br />
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom> {thread.Author.Username} </Typography>
                    <Typography variant="h5" component="h2"> {thread.Title} </Typography>
                    <Typography color="textSecondary"> {thread.CreatedDate} </Typography>
                    <Typography variant="body2" component="p">{thread.Content} </Typography>
                  </CardContent>
                </Card>
                < br /> <br />< br /> <br />< br /> <br />< br /> <br />
              </Grid>
            </Grid>
          </Container>
        </Dialog >;
    }

    return (
      <div>
        {threadDialog}
      </div >
    );
  }
}



export default ThreadDialog;
