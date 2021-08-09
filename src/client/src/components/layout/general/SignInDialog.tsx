import React, { useContext, useState } from 'react'
import { Dialog, Card, CardContent } from '@material-ui/core'
import Axios from 'axios'

import UiContext from '../../../context/ui-context'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import appConstant from '../../../constant/constant'
import { MyButton } from '../../common/MyButton'
import { MyTextField } from '../../common/MyTextField'

const SignInDialog = (props: any) => {
  const [username, setUsername] = useState('test-user-0.07546525770485024')
  const [password, setPassword] = useState('passwordXD')

  const { signIn, setSignIn } = useContext(UiContext)

  const setCookie = useCookies(['my-cookie'])[1]
  const history = useHistory()

  const submitSignIn = (event: any) => {
    console.log(`Submit info is ${username} with ${password}`)
    const data = {
      username: username,
      password: password
    }
    const url = `${appConstant.URL}/api/users/signin`
    Axios.post(url, data).then(res => {
      const token = res.data.token
      setCookie('tokenbon', token, {
        path: '/',
        maxAge: 6000, // in second
        // httpOnly: true,
        sameSite: true
      })
      console.log(token)
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
