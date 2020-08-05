import React from 'react'
import { CardActionArea, Card, TextField, CardContent, Grid } from '@material-ui/core'

const NewThreadButton = (props) => {
  return (
    <Grid item xs={12}>

      <Card>
        <CardActionArea onClick={props.openCreateNewThread}>
          <CardContent>
            <TextField variant='outlined' fullWidth label='Create Post' />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default NewThreadButton;
