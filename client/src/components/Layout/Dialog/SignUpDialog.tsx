import React, { useContext, useState } from 'react'
import { TextField, Button, Dialog } from '@material-ui/core'
import Axios from 'axios'

import UiContext from '../../../context/ui-context'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

const SignUpDialog = (props: any) => {
  const { signUp, setSignUp } = useContext(UiContext)
  const history = useHistory()

  const submitSignUp = (event: any) => {

  }

  return (
    <Dialog
      open={signUp}
      onBackdropClick={() => setSignUp(false)}
      onEscapeKeyDown={() => setSignUp(false)}
      transitionDuration={0}
      maxWidth='lg'
      fullWidth={true} >
      <div>
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
      </div >
    </Dialog>
  )
}

export default SignUpDialog
