import React from 'react'
import { Card, Grid, Container, Typography, CardContent, CardActions, Button } from '@material-ui/core'

const ThreadModal = (props) => {
  const t = props.thread;
  return (
    <Container maxWidth="lg">
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
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>


  )
}

export default ThreadModal;
