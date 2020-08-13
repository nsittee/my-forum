import React, { Component } from 'react';
import axios from 'axios';
import { Card, Grid, Container, Typography, CardContent, Dialog } from '@material-ui/core';

class ThreadDialog extends Component {
  state = {
    thread: null,
  }


  getThreadData = (id) => {
    // TODO: Fetch data then return thread
    axios.get(`http://localhost:5000/api/threads/${id}`)
      .then(res => {
        console.log(res.data.data);
        this.setState({ thread: res.data.data });
        return;
      })
      .catch(err => console.log(err));

  }
  closeDialog = () => {
    this.props.history.push("/");
  }

  componentDidMount = () => {
    this.getThreadData(this.props.match.params.id);
  }

  render() {
    console.log('ThreadDialog');
    let threadDialog = null;
    if (this.state.thread) {
      const thread = this.state.thread;

      threadDialog =
        <Dialog
          open='true'
          onBackdropClick={this.closeDialog}
          maxWidth='lg'
          fullWidth={true} >
          <Container>
            <Grid container alignContent='center'>
              <Grid item xs={12}>
                < br /> <br />< br /> <br />
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {thread.author} </Typography>
                    <Typography variant="h5" component="h2">
                      {thread.threadTitle} </Typography>
                    <Typography color="textSecondary">
                      {thread.published.date + ' ' + thread.published.time} </Typography>
                    <Typography variant="body2" component="p">
                      {thread.content}
                    </Typography>
                  </CardContent>
                </Card>
                < br /> <br />
              </Grid>
            </Grid>
          </Container>
        </Dialog>;
    }

    return (
      <div>
        {threadDialog}
      </div>
    )
  }
}



export default ThreadDialog;
