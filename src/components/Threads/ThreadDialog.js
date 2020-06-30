import React from 'react'
import { Card, Grid, Container, Typography, CardContent } from '@material-ui/core'

const ThreadDialog = (props) => {
  const t = props.thread;
  return (
    <Container>
      <Grid container alignContent='center'>
        <Grid item xs={12}>
          < br /> <br />< br /> <br />

          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t.author} </Typography>
              <Typography variant="h5" component="h2">
                {t.threadTitle} </Typography>
              <Typography color="textSecondary">
                {t.published.date + ' ' + t.published.time} </Typography>
              <Typography variant="body2" component="p">
                {t.content}
              </Typography>
            </CardContent>
          </Card>
          < br /> <br />
        </Grid>
      </Grid>
    </Container>


  )
}

export default ThreadDialog;
