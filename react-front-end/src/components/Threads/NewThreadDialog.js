import React from 'react'
import { useHistory } from "react-router";
import { Card, TextField, Button, CardContent, Dialog } from '@material-ui/core'

const NewThreadDialog = () => {
  const history = useHistory();

  return (
    <Dialog
      open={true}
      maxWidth='lg'
      fullWidth={true}
      onBackdropClick={() => history.push("/")}
      onEscapeKeyDown={() => history.push("/")}
      transitionDuration={0}>
      <Card>
        <CardContent>
          <form autoComplete="off">
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
              Create </Button>
          </form>
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default NewThreadDialog;
