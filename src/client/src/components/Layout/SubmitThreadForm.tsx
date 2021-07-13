import React, { useContext, useEffect, useState } from "react"
import { Button, Card, CardContent } from "@material-ui/core"
import { Form, Field } from 'react-final-form'

import AuthContext from '../../context/auth-context'
import { useHistory } from "react-router-dom"
import Axios from "axios"
import appConstant from '../../constant/constant';

const CreateThreadForm = () => {
  const [userSub, setUserSub] = useState([])
  const authContext = useContext(AuthContext)
  const history = useHistory()


  useEffect(() => {
    const fetchData = () => {
      // FIXME : Add api that get userSub from back-end
      console.log(authContext)
      Axios.get(`${appConstant.URL}/api/users/`, {
        headers: {
          authorization: authContext.token
        }
      }).then(res => {
        console.log(res.data)
        const subList = res.data.data.UserSub

        setUserSub(subList.map((sub: any) => {
          return <option key={sub._id} value={sub._id}> {sub.SubLongName} </option>
        }))
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

  // const validate = (formInput: any) => {

  // }

  return (
    <div>
      <Card>
        <CardContent>
          <Form
            onSubmit={onSubmit}
            // validate={validate}
            render={props => (
              // TODO: Use material UI form component
              <form onSubmit={(event) => props.handleSubmit(event)}>
                <h2>Simple Default Input</h2>
                <Field name="userId" defaultValue={authContext.id} type="hidden" component="input" />

                <div>
                  <label>Community</label><br />
                  <Field name="subId" component="select" >
                    {userSub}
                  </Field>
                </div>

                <div>
                  <label>Title</label><br />
                  <Field name="title" component="input" placeholder="First Name" />
                </div>

                <div>
                  <label>Content</label><br />
                  <Field name="content" component="textarea" placeholder="First Name" />
                </div>

                <Button type="submit" variant="contained" color="secondary">
                  Submit </Button>
              </form>
            )}
          />
        </CardContent>
      </Card>

    </div>
  )
}

export default CreateThreadForm