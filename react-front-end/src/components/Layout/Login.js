import React, { useContext, useState } from 'react';
import { TextField, Button, Dialog } from '@material-ui/core';

import AuthContext from '../../context/auth-context'
import UiContext from '../../context/ui-context'

const Login = () => {
  const context = useContext(AuthContext)
  const uiContext = useContext(UiContext)

  const [signInStatus, setSignInStatus] = useState()
  setSignInStatus(uiContext.showSignInDialog)

  const disable = () => {
    setSignInStatus(false)
    console.log("close")
  }

  return (
    <Dialog
      open={signInStatus}
      onBackdropClick={disable}
      onEscapeKeyDown={disable}
      transitionDuration={0}
      maxWidth='lg'
      fullWidth={true} >
      <div>
        <form autoComplete="off" onSubmit={context.loginHandler}>
          <br />
          <TextField label="Username" />  <br />
          <TextField label="Password" type="password" /> < br /> <br />
          <Button
            type="submit"
            variant="contained"
            color="primary">Sign in </Button>
        </form>
      </div >

    </Dialog>
  )
}

export default Login;
