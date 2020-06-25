import React, { useState } from 'react';
import Thread from './Forum'
import Grid from '@material-ui/core/Grid';
const Threads = () => {

  // if only getting the state, using one variable is okay
  const [titlesList] = useState([
    'A1', 'A2', 'A3', 'A4', 'A5',
    'A1', 'A2', 'A3', 'A4', 'A5',
    'A1', 'A2', 'A3', 'A4', 'A5',
    'A1', 'A2', 'A3', 'A4', 'A5',
    'A1', 'A2', 'A3', 'A4', 'A5',
    'A1', 'A2', 'A3', 'A4', 'A5',
    'A1', 'A2', 'A3', 'A4', 'A5'
  ]);


  let contents = titlesList.map((title, id) => {
    return <Thread key={id} title={title} />
  })

  console.log('this is contents', contents)

  return (
    <Grid container spacing={1}>
      {contents}
    </Grid>
  )
}

export default Threads;
