import { Container, Grid } from '@material-ui/core';
import React from 'react'
import { MyCard } from '../components/common/MyCard';
import SubmitThreadForm from '../components/layout/threads/CreateThreadForm';

const SubmitPage = () => {
  return (
    <Container maxWidth="md">
      <br />
      <MyCard header="Submit Thread" />
      <br />
      {/* form here */}
      <Grid container spacing={1} direction="column">
        <Grid item>
          <SubmitThreadForm />
        </Grid>
      </Grid>

      <br />
    </Container>
  )
}

export default SubmitPage;
