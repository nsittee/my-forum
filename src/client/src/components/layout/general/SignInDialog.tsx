import React, { useContext, useState } from 'react'
import { Dialog, Card, CardContent } from '@material-ui/core'

import UiContext from '../../../context/ui-context'
import { useHistory } from 'react-router-dom'
import { MyButton } from '../../common/MyButton'
import { MyTextField } from '../../common/MyTextField'
import { myAxios } from '../../../config/axios-config'

const SignInDialog = (props: any) => {
  const [username, setUsername] = useState('test-user-0.07546525770485024')
  const [password, setPassword] = useState('passwordXD')
  const { signIn, setSignIn } = useContext(UiContext)
  const history = useHistory()

  const submitSignIn = (event: any) => {
    const data = {
      username: username,
      password: password
    }
    const url = `/api/auth/signin`
    myAxios.post(url, data).then(res => {
      const aToken = res.data.data.aToken
      const bToken = res.data.data.bToken

      localStorage.setItem('a-token', aToken)
      localStorage.setItem('b-token', bToken)

      history.go(0)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Dialog
      open={signIn}
      onClose={() => setSignIn(false)}
      transitionDuration={0}
      fullWidth={true} >
      <Card>
        <CardContent>
          <form autoComplete="off">
            <br />
            <MyTextField
              label="Username"
              value={username}
              onChange={(event: any) => setUsername(event.target.value)}
            />
            <br />
            <MyTextField
              label="Password"
              type="password"
              value={password}
              onChange={(event: any) => setPassword(event.target.value)}
            />

            < br /> <br />
            <MyButton
              variant="contained"
              onClick={(event: any) => submitSignIn(event)}
              color="primary">
              Sign in
            </MyButton>
          </form>
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default SignInDialog
