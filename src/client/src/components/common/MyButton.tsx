import { Button } from '@material-ui/core'
import React from 'react'

export const MyButton = (props: any) => {
  return <Button
    variant="contained"
    {...props}>
    {props.children}
  </Button>
}
