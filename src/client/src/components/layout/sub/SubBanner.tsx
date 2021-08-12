import { Button, CardContent, Container, Grid } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../context/auth-context'
import PropTypes from 'prop-types'
import { myAxios } from '../../../config/axios-config'
import { ISub } from '../../../shared/model/sub.model'
import randomColor from 'randomcolor'

const SubBanner = (props: any) => {
  const authContext = useContext(AuthContext)
  const [color] = useState(randomColor({ count: 2, luminosity: 'light' }))
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    const subList = props.user.UserSub as ISub[]
    const currentSub = subList.find(sub => sub._id === props.subId)
    if (currentSub) setJoined(true)
  }, [props])


  const joinButtonHandler = () => {
    if (!props.subId || !authContext.authenticated) {
      console.log('sign in && go to sub page first')
      return
    } else if (joined) {
      console.log('leaving sub is not implemented')
      return
    }
    console.log(props.subName)

    var action = joined ? 'leave' : 'join'
    var url = `/api/subs/${action}?subId=${props.subId}`
    myAxios.post(url, null, {
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
      background: color[0],
      minHeight: '180px'
    }}>
      <div style={{
        height: '80px',
        background: color[1]
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

SubBanner.propTypes = {
  subId: PropTypes.string,
  subName: PropTypes.string,
  user: PropTypes.object,
}

export default SubBanner