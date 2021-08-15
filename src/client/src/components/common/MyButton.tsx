import { Button } from '@material-ui/core'
import React from 'react'

export const MyButton = (props: any) => {
  return <Button
    {...props}
    variant="contained">
    {props.children}
  </Button>
}
