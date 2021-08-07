import React, { useEffect, useState } from 'react'
import { Card, Typography, CardContent, Dialog } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import Axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import appConstant from '../../../constant/constant';

const ThreadDialog = () => {
  const [thread, setThread] = useState(null)
  const { id: threadId }: any = useParams()
  const history = useHistory()

  useEffect(() => {
    const getThread = (id: string) => {
      setTimeout(() => {
        Axios.get(`${appConstant.URL}/api/threads/${id}`)
          .then(res => setThread(res.data))
          .catch(err => console.log(err));
      }, 0)
    }
    getThread(threadId)
  }, [threadId])

  var t: any = thread

  return <Dialog
    open={true}
    onBackdropClick={() => history.goBack()}
    onEscapeKeyDown={() => history.goBack()}
    transitionDuration={0}
    maxWidth='md'
    fullWidth={true} >
    {thread ?
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom> {t.Author.Username} </Typography>
          <Typography variant="h5"> {t.Title} </Typography>
          <Typography variant="body2" color="textSecondary"> {t.CreatedDate} </Typography>
          <Typography variant="body1">{t.Content} </Typography>
          <br /><br /><br /><br /><br />
        </CardContent>
      </Card>
      :
      <Card>
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom> <Skeleton /></Typography>
          <Typography variant="h5">   <Skeleton /></Typography>
          <Typography variant="body2" color="textSecondary">  <Skeleton /></Typography>
          <Typography variant="body1">  <Skeleton /></Typography>
        </CardContent>
      </Card>
    }
  </Dialog >
}



export default ThreadDialog;
