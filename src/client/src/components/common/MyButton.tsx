import { Button } from '@material-ui/core'
import React from 'react'

export const MyButton = (props: any) => {
  return <Button
    variant="contained"
    onClick={props.onClick}
    color={props.color}>
    {props.children}
  </Button>
}
