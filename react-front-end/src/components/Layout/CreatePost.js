import React from 'react'
import { useHistory } from 'react-router';
import { Card, TextField } from '@material-ui/core'
import { useCookies } from 'react-cookie';

const CreatePost = () => {
  const history = useHistory();
  const [cookies] = useCookies(['my-cookie'])

  var newThread = null
  if (cookies.tokenbon) {
    newThread =
      <Card onClick={() => history.push('/submit')}>
        <TextField variant='outlined' fullWidth label='Create Post' />
      </Card>
  }
  return newThread
}

export default CreatePost;
