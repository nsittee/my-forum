import { Button } from '@material-ui/core'
import React from 'react'

export const MyButton = (props: any) => {
  return <Button
    variant="contained"
    type={props.type}
    onClick={props.onClick}
    color={props.color}>
    {props.children}
  </Button>
}
