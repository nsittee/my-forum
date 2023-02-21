import React from 'react'
import { useHistory } from 'react-router'
import { Card, TextField } from '@mui/material'

const CreateThreadCard = () => {
  const history = useHistory()

  var newThread = null
  if (localStorage.getItem('a-token')) {
    newThread =
      <Card onClick={() => history.push('/submit')}>
        <TextField variant='outlined' fullWidth label='Create Post' />
      </Card>
  }
  return newThread
}

export default CreateThreadCard
