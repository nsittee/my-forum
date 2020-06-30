import React from 'react'
import { Card, TextField, Button, CardContent, Dialog } from '@material-ui/core'

const NewThreadDialog = (props) => {
  return (
    <Dialog
      open={props.dialogNewThreadOn}
      onBackdropClick={props.closeModal}>
      <Card>
        <CardContent>
          <form autoComplete="off" onSubmit={props.submitNewThread}>
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
