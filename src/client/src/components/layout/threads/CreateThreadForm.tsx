import React, { useContext, useEffect, useState } from "react"
import { Card, CardContent, MenuItem, Typography } from "@material-ui/core"
import { TextField, Select } from "mui-rff"
import { Form, Field } from 'react-final-form'

import AuthContext from '../../../context/auth-context'
import { useHistory } from "react-router-dom"
import Axios from "axios"
import appConstant from '../../../constant/constant';
import { MyButton } from "../../common/MyButton"

const CreateThreadForm = () => {
  const [userSub, setUserSub] = useState([])
  const authContext = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    const fetchData = () => {
      // FIXME : Add api that get userSub from back-end
      // console.log(authContext)
      Axios.get(`${appConstant.URL}/api/users/`, {
        headers: {
          authorization: authContext.token
        }
      }).then(res => {
        setUserSub(res.data.data.UserSub)
      }).catch(err => {
        console.log(err)
      })
    }
    fetchData()
  }, [authContext])

  const onSubmit = (formData: any) => {
    const data = {
      Thread: {
        Title: formData.title,
        Author: { _id: formData.userId },
        SubParent: { _id: formData.subId },
        Content: formData.content
      }
    }
    console.log(formData)
    Axios.post(`${appConstant.URL}/api/threads/`, data, {
      headers: {
        authorization: authContext.token
      }
    })
      .then(res => {
        console.log("Added New Thread" + res)
      }).catch(err => {
        console.log("ERROR " + err)
      })
    history.push('/')
  }

  return (
    <Card>
      <CardContent>
        <Form
          onSubmit={onSubmit}
          render={props => (
            // TODO: Use material UI form component
            <form onSubmit={(event) => props.handleSubmit(event)}>

              <Field name="userId" defaultValue={authContext.id} type="hidden" component="input" />
              <div>
                <Typography>Community</Typography>
                <Select name="subId" placeholder="xx">
                  <MenuItem key="default" disabled value="Select Community">Select Community</MenuItem>
                  {
                    userSub.map((sub: any, i: number) => {
                      return <MenuItem key={sub._id + "" + i} value={sub._id}>{sub.SubLongName}</MenuItem>
                    })
                  }
                </Select>
              </div>

              <div>
                <Typography>Title</Typography>
                <TextField name="title" placeholder="Title"></TextField>
              </div>

              <div>
                <Typography>Content</Typography>
                <TextField name="content" multiline rows={8} placeholder="Text"></TextField>
              </div>
              <br />
              <MyButton type="submit" color="primary">Submit</MyButton>
            </form>
          )}
        />
      </CardContent>
    </Card>
  )
}

export default CreateThreadForm