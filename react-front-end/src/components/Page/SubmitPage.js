import { Card, Grid } from '@material-ui/core';
import React from 'react'
import SubmitThreadForm from '../Layout/SubmitThreadForm';

const SubmitPage = () => {
  return (
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
  )
}

export default SubmitPage;
