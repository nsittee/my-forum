import { Button, CardContent, Container, Grid } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import randomColor from 'randomcolor'

const SubBanner = (props: any) => {
  const [color] = useState(randomColor({ count: 2, luminosity: 'light' }))

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
            {props.joined ?
              <Button
                onClick={props.leaveHandler}
                color='secondary'
                variant='contained'
                style={{ marginLeft: 100 }}>
                Joined
              </Button>
              :
              <Button
                onClick={props.joinHandler}
                color='secondary'
                variant='contained'
                style={{ marginLeft: 100 }}>
                Join now
              </Button>
            }
          </Grid>
        </CardContent>
      </Container>
    </div>
  )
}

SubBanner.propTypes = {
  subName: PropTypes.string,
  joined: PropTypes.bool,
  joinHandler: PropTypes.func,
  leaveHandler: PropTypes.func,
}

export default SubBanner