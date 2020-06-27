import React from 'react'
import { Grid, Card, TextField, Button, CardContent } from '@material-ui/core'

const NewThread = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <form>
                <TextField
                  label='Title'
                  fullWidth />
                <TextField
                  fullWidth
                  label='Content'
                  multiline
                  rows={2}
                  rowsMax={4}
                />
                <br /><br />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary">
                  Create
              </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default NewThread;
