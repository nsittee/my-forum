import React from 'react'
import { useHistory } from 'react-router';
import { Card, TextField, CardContent, Grid } from '@material-ui/core'

const NewThreadButton = (props) => {
  const history = useHistory();
  return (
    <Grid item xs={12}>
      <Card onClick={() => history.push('/create')}>
        <CardContent>
          <TextField variant='outlined' fullWidth label='Create Post' />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default NewThreadButton;
