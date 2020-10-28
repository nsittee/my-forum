import { Button, Card, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react'

const SubmitPage = () => {
  const [community, setCommunity] = useState()
  const handleChange = (event) => {
    console.log('hlp')
    setCommunity(event.target.value)
  }

  return (
    <Grid container spacing={1} direction="column">
      <Grid item>
        <Card>
          <h1>Submit</h1>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <InputLabel>Select Community</InputLabel>
          <Select
            value={community}
            onChange={event => { handleChange(event) }}
            fullWidth={true}>
            <MenuItem value={'Sub 45'}>Sub 45</MenuItem>
            <MenuItem value={'Sub 100'}>Sub 100</MenuItem>
            <MenuItem value={'Sub 620'}>Sub 620</MenuItem>
          </Select>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <h5>Input control</h5>

          <Button variant="contained" color="secondary">
            Submit
          </Button>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SubmitPage;
