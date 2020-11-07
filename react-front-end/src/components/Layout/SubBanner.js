import { Button, CardContent, Container, Grid } from '@material-ui/core'
import Axios from 'axios'
import React, { useContext, useState } from 'react'
import AuthContext from '../../context/auth-context'

const SubBanner = props => {
  console.log(props)
  const authContext = useContext(AuthContext)
  const [joined, setJoined] = useState(false)

  if (!joined && props.subId && props.userSub.includes(props.subId)) {
    setJoined(true)
  }

  const joinButtonHandler = () => {
    if (!props.subId || !authContext.authenticated) {
      console.log('sign in && go to sub page first')
      return
    } else if (joined) {
      console.log('sign out not implemented')
      return
    }
    console.log(props.subName)

    var action = joined ? 'leave' : 'join'
    var url = `http://localhost:5000/api/subs/${action}?subId=${props.subId}`
    Axios.post(url, null, {
      headers: {
        authorization: authContext.token
      }
    }).then(res => {
      if (joined) {
        console.log('leave success')
        setJoined(false)
      } else {
        console.log('join success')
        setJoined(true)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div style={{
      background: 'MediumSlateBlue',
      minHeight: '180px'
    }}>
      <div style={{
        height: '80px',
        background: 'NavajoWhite'
      }}>
        <Container maxWidth="md">
          <CardContent>
            Logo.png goes here
          </CardContent>
        </Container>
      </div>
      <Container maxWidth="md">
        <CardContent>
          <Grid container>
            Sub name goes here <br />
            {props.subName}
            <Button
              onClick={joinButtonHandler}
              color='secondary'
              variant='contained'
              style={{ marginLeft: 100 }}>
              {joined ? 'Joined' : `Join now`} </Button>
          </Grid>
        </CardContent>
      </Container>
    </div>
  )
}

export default SubBanner;