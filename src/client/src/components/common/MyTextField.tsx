import { TextField } from '@mui/material'
import React from 'react'

export const MyTextField = (props: any) => {
  return (
    <TextField
      label={props.label}
      type={props.type}
      value={props.value}
      onChange={props.onChange}>
      {props.children}
    </TextField>
  )
}
