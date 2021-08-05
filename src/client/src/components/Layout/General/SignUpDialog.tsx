import React, { useContext } from 'react'
import { TextField, Button, Dialog, Card, CardContent } from '@material-ui/core'
import UiContext from '../../../context/ui-context'

const SignUpDialog = (props: any) => {
  const { signUp, setSignUp } = useContext(UiContext)
  const submitSignUp = (event: any) => {
  }

  return (
    <Dialog
      open={signUp}
      onBackdropClick={() => setSignUp(false)}
      onEscapeKeyDown={() => setSignUp(false)}
      transitionDuration={0}
      fullWidth={true} >
      <Card>
        <CardContent>
          <form autoComplete="off">
            <br />
            <TextField
              label="Username"
              value=""
            />
            <br />
            <TextField
              label="Password"
              type="password"
              value=""
            />
            <br />
            <TextField
              label="Confirm Password"
              type="password"
              value=""
            />

            < br /> <br />
            <Button
              variant="contained"
              onClick={event => submitSignUp(event)}
              color="primary">
              Sign up </Button>
          </form>
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default SignUpDialog
