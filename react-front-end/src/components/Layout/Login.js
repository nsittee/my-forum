import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Dialog } from '@material-ui/core';

import AuthContext from '../../context/auth-context'
import UiContext from '../../context/ui-context'

const Login = (props) => {
  const context = useContext(AuthContext)
  const uiContext = useContext(UiContext)
  // console.log(uiContext)

  const [dialogStatus, setDialogStatus] = useState(false)

  const disableDialog = () => {
    setDialogStatus(false)
    // setUiContext({ showSignInDialog: false })
    console.log("disable")
  }

  useEffect(() => {
    setDialogStatus(uiContext.showSignInDialog)
  })

  return (
    <Dialog
      open={dialogStatus}
      onBackdropClick={disableDialog}
      onEscapeKeyDown={disableDialog}
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
