import React from 'react'
import { Button, Card } from '@material-ui/core'

const ThreadFilter = () => {
  return (
    <Card>
      <Button>Best</Button>
      <Button>Hot</Button>
      <Button>New</Button>
      <Button>Top</Button>
      <Button>Rising</Button>
    </Card>
  )
}

export default ThreadFilter