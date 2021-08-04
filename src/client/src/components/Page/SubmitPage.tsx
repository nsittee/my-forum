import { Card, Container, Grid } from '@material-ui/core';
import React from 'react'
import SubmitThreadForm from '../Layout/Threads/CreateThreadForm';

const SubmitPage = () => {
  return (
    <Container maxWidth="md">
      <br />
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Card>
            <h1>Submit</h1>
          </Card>
        </Grid>
        <Grid item>
          <SubmitThreadForm />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SubmitPage;
