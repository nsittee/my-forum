import { Button, CardContent, Container, Grid } from '@material-ui/core'
import React from 'react'

const SubBanner = props => {
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
          <Grid Container direction='column'>
            Sub name goes here <br />
            {props.subName}
            <Button color='secondary' variant='contained' style={{ marginLeft: 100 }}>
              Join
              </Button>
          </Grid>
        </CardContent>
      </Container>
    </div>
  )
}

export default SubBanner;