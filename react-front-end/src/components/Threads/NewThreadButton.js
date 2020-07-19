import React from 'react'
import { CardActionArea, Card, TextField, CardContent } from '@material-ui/core'

const NewThreadButton = (props) => {
  return (
    <Card>
      <CardActionArea onClick={props.openCreateNewThread}>
        <CardContent>
          <TextField variant='outlined' fullWidth label='Create Post' />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default NewThreadButton;
