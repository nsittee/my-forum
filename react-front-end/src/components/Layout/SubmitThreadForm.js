import React, { useContext, useState } from "react";
import { Button, Card } from "@material-ui/core";
import { Form, Field } from 'react-final-form'

import AuthContext from '../../context/auth-context'
import { useHistory } from "react-router-dom";
import Axios from "axios";

const CreateThreadForm = () => {
  const authContext = useContext(AuthContext)
  const history = useHistory()

  const getMyCommunity = () => {
    console.log(authContext.userSub)
    return authContext.userSub.map(sub => {
      return <option key={sub._id} value={sub._id}> {sub.SubLongName} </option>
    })
  }
  const community = getMyCommunity()

  const onSubmit = (formData) => {
    const data = {
      Thread: {
        Title: formData.title,
        Author: { _id: formData.userId },
        SubParent: { _id: formData.subId },
        Content: formData.content
      }
    }
    console.log(formData)
    Axios.post('http://localhost:5000/api/threads/', data, {
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
  const validate = () => {

  }

  return (
    <div>

      <Card>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={props => (
            // TODO: Use material UI form component
            <form onSubmit={(event) => props.handleSubmit(event)}>
              <h2>Simple Default Input</h2>
              <Field name="userId" defaultValue={authContext.id} type="hidden" component="input" />

              <div>
                <label>Community</label><br />
                <Field name="subId" component="select" >
                  {community}
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
      </Card>

    </div>
  );
}

export default CreateThreadForm;