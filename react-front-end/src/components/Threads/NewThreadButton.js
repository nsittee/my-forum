import React from 'react'
import { Card, TextField, CardContent, Grid } from '@material-ui/core'

const NewThreadButton = (props) => {
  return (
    <Grid item xs={12}>

      <Card onClick={props.openCreateNewThread}>
        <CardContent>
          <TextField variant='outlined' fullWidth label='Create Post' />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default NewThreadButton;
