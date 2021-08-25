import React, { useEffect, useState } from 'react'
import { Card, Typography, CardContent, Dialog } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import { useHistory, useParams } from 'react-router-dom'
import { myAxios } from '../../../config/axios-config';
import { defaultThread, IThread } from '../../../shared/model/thread.model';
import { IResponseEntity } from '../../../shared/response.model';

const ThreadDialog = () => {
  const [thread, setThread] = useState<IThread>(defaultThread)
  const { id: threadId }: any = useParams()
  const history = useHistory()

  useEffect(() => {
    const getThread = (id: string) => {
      myAxios.get<IResponseEntity<IThread>>(`/api/threads/${id}`)
        .then(res => setThread(res.data.data))
        .catch(err => console.log(err));
    }
    getThread(threadId)
  }, [threadId])

  return <Dialog
    open={true}
    onClose={() => history.goBack()}
    transitionDuration={0}
    maxWidth='md'
    fullWidth={true} >
    {thread ?
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom> {thread.Author.Username} </Typography>
          <Typography variant="h5"> {thread.Title} </Typography>
          <Typography variant="body2" color="textSecondary"> {thread.CreatedDate} </Typography>
          <Typography variant="body1">{thread.Content} </Typography>
          <br /><br /><br /><br /><br />
        </CardContent>
      </Card>
      :
      <Card>
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom> <Skeleton width="20%" /></Typography>
          <Typography variant="h5">   <Skeleton width="60%" /></Typography>
          <Typography variant="body2" color="textSecondary">  <Skeleton width="15%" /></Typography>
          <Typography variant="body1">  <Skeleton /></Typography>
          <Typography variant="body1">  <Skeleton /></Typography>
          <Typography variant="body1">  <Skeleton /></Typography>
          <Typography variant="body1">  <Skeleton width="30%" /></Typography>
        </CardContent>
      </Card>
    }
  </Dialog >
}



export default ThreadDialog;
