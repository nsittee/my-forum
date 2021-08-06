import React, { useContext } from 'react'
import { Dialog, Card, CardContent } from '@material-ui/core'
import { MyButton } from '../../common/MyButton'
import UiContext from '../../../context/ui-context'
import { MyTextField } from '../../common/MyTextField'

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
            <MyTextField
              label="Username"
              value=""
            />
            <br />
            <MyTextField
              label="Password"
              type="password"
              value=""
            />
            <br />
            <MyTextField
              label="Confirm Password"
              type="password"
              value=""
            />

            < br /> <br />
            <MyButton
              variant="contained"
              onClick={(event: any) => submitSignUp(event)}
              color="primary">
              Sign up
            </MyButton>
          </form>
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default SignUpDialog
