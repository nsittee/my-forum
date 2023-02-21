import { Button } from '@mui/material'
import React from 'react'

export const MyButton = (props: any) => {
  return <Button
    variant="contained"
    {...props}>
    {props.children}
  </Button>
}
