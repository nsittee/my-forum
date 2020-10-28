import { Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react'

const SubmitPage = () => {
  const [community, setCommunity] = useState('Sub 45')
  const handleChange = (event) => {
    console.log('hlp')
    setCommunity(event.target.value)
  }

  return (
    <Grid>
      <h1>Submit</h1>
      <InputLabel>Select Community</InputLabel>
      <Select
        value={community}
        onChange={event => { handleChange(event) }}
        fullWidth={true}>
        <MenuItem value={'Sub 45'}>Sub 45</MenuItem>
        <MenuItem value={'Sub 100'}>Sub 100</MenuItem>
        <MenuItem value={'Sub 620'}>Sub 620</MenuItem>
      </Select>
    </Grid>
  )
}

export default SubmitPage;
