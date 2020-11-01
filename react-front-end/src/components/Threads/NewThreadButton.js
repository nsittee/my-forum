import React from 'react'
import { useHistory } from 'react-router';
import { Card, TextField, CardContent, Grid } from '@material-ui/core'
import { useCookies } from 'react-cookie';

const NewThreadButton = () => {
  const history = useHistory();
  const [cookies] = useCookies(['my-cookie'])

  var newThread = <div></div>
  if (cookies.tokenbon) {
    newThread = <Grid item xs={12}>
      <Card onClick={() => history.push('/submit')}>
        <CardContent>
          <TextField variant='outlined' fullWidth label='Create Post' />
        </CardContent>
      </Card>
    </Grid>
  }
  return newThread
}

export default NewThreadButton;
