import React, { useContext, useState } from "react";
import { Button, Card, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Form, Field } from 'react-final-form'

import AuthContext from '../../context/auth-context'
import { useHistory } from "react-router-dom";

const CreateThreadForm = () => {
  const authContext = useContext(AuthContext)
  const history = useHistory()

  const getMyCommunity = () => {
    console.log(authContext.userSub)
    return authContext.userSub.map(sub => {
      return <MenuItem key={sub._id} value={sub._id}> {sub.SubLongName} </MenuItem>
    })
  }
  const community = getMyCommunity()

  const onSubmit = (formData) => {
    // TODO: Get author data
    console.log(formData)
    // history.push('/')
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
            <form onSubmit={(event) => props.handleSubmit(event)}>
              <h2>Simple Default Input</h2>
              <Select
                name="sub"
                fullWidth={true}>
                {community}
              </Select>

              {/* <Field name="sub" component="select">
              </Field> */}

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