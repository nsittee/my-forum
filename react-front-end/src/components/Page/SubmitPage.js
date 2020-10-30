import { Card, Grid } from '@material-ui/core';
import React from 'react'
import CreateThreadForm from '../Layout/CreateThreadForm';

const SubmitPage = () => {
  return (
    <Grid container spacing={1} direction="column">
      <Grid item>
        <Card>
          <h1>Submit</h1>
        </Card>
      </Grid>
      <Grid item>
        <CreateThreadForm />
      </Grid>
    </Grid>
  )
}

export default SubmitPage;
