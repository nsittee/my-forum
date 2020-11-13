import { Button, CardContent, Container, Grid } from '@material-ui/core'
import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth-context'
import PropTypes from 'prop-types';

const SubBanner = (props: any) => {
  const authContext = useContext(AuthContext)
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    if (authContext.authenticated) {
      const fetchData = async () => {
        try {
          const res = await Axios.get(
            'http://localhost:5000/api/users/',
            authContext.header
          )
          const userSub: Array<any> = res.data.data.UserSub
            .map((sub: any) => sub._id)
          if (userSub.includes(props.subId)) setJoined(true)
        } catch (err) {
          console.log(err)
        }
      }
      fetchData()
    }

  }, [authContext, props.subId])

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

SubBanner.propTypes = {
  subId: PropTypes.string,
  subName: PropTypes.string,
}

export default SubBanner;