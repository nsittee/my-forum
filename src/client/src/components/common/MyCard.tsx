import { Card, CardContent, CardHeader } from '@mui/material'
import React from 'react'

export const MyCard = (props: any) => {
  return (
    <Card>
      <CardHeader
        title={props.header}
      />
      {props.children ?
        <CardContent>
          {props.children}
        </CardContent>
        : null
      }
    </Card>
  )
}
