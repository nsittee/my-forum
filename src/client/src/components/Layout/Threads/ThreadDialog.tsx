import React, { useEffect, useState } from 'react'
import { Card, Grid, Container, Typography, CardContent, Dialog } from '@material-ui/core'
import Axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import appConstant from '../../../constant/constant';

const ThreadDialog = () => {
  const [thread, setThread] = useState(null)
  const { id: threadId }: any = useParams()
  const history = useHistory()

  useEffect(() => {
    const getThread = (id: string) => {
      Axios.get(`${appConstant.URL}/api/threads/${id}`)
        .then(res => { setThread(res.data) })
        .catch(err => console.log(err));
    }
    getThread(threadId)
  }, [threadId])

  let threadDialog = null
  if (thread) {
    var t: any = thread
    threadDialog =
      <Dialog
        open={true}
        onBackdropClick={() => history.goBack()}
        onEscapeKeyDown={() => history.goBack()}
        transitionDuration={0}
        maxWidth='lg'
        fullWidth={true} >
        <Container>
          <Grid container alignContent='center'>
            <Grid item xs={12}>
              < br /> <br />
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom> {t.Author.Username} </Typography>
                  <Typography variant="h5" component="h2"> {t.Title} </Typography>
                  <Typography color="textSecondary"> {t.CreatedDate} </Typography>
                  <Typography variant="body2" component="p">{t.Content} </Typography>
                </CardContent>
              </Card>
              < br /> <br />< br /> <br />< br /> <br />< br /> <br />
            </Grid>
          </Grid>
        </Container>
      </Dialog >
  }

  return (
    <div>
      {threadDialog}
    </div >
  )
}



export default ThreadDialog;
