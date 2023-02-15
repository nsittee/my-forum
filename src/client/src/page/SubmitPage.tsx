import { Card, CardContent, Container, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { MyCard } from '../components/common/MyCard'

import { Form, Field } from 'react-final-form'
import { MyButton } from '../components/common/MyButton'
import { myAxios } from '../config/axios-config'
import { graphQlQueries } from '../graphql'
import { ISub } from '../shared/model/sub.model'
import { IUser } from '../shared/model/user.model'
import { IResponseEntity } from '../shared/response.model'
import AuthContext from '../context/auth-context'

export const SubmitPage = () => {
  const [userSub, setUserSub] = useState<ISub[]>([])
  const authContext = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    const fetchData = () => {
      myAxios.get<IResponseEntity<IUser>>(`/api/users/joined-sub`)
        .then(res => {
          setUserSub(res.data.data.UserSub!!)
        }).catch(err => {
          console.log(err)
        })
    }
    fetchData()
  }, [authContext])

  const onSubmit = async (formData: any) => {
    const gql = {
      query: graphQlQueries.createThread,
      variables: {
        title: formData.title,
        content: formData.content,
        authorId: formData.userId,
        subId: formData.subId,
      }
    }
    const res = await myAxios.post(`/api/graphql`, gql)
    // const thread = {
    //   title: formData.title,
    //   content: formData.content,
    //   authorId: formData.userId,
    //   subId: formData.subId,
    // }
    // myAxios.post<IResponseEntity<IThread>>(`/api/threads/`, { Thread: thread })
    //   .then(res => {
    //     console.log("Added New Thread" + res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    history.push('/')
  }

  const validate = (values: FormData) => {
    console.log(values)
    if (!values["subId"] || values["subId"] !== "5f9b7ffd8578b129f4c9ed10")
      return { subId: "only sub 795 is allowed" }
    if (!values["title"] || values["title"].length <= 8)
      return { title: "title should be longer than 8 characters" }
    if (!values["content"] || values["content"] === "")
      return { content: "content cannot be empty" }

    return
  }
  return (
    <Container maxWidth="md">
      <br />
      <MyCard header="Submit Thread" />
      <br />
      {/* form here */}
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Card>
            <CardContent>
              <Form
                onSubmit={onSubmit}
                validate={validate}
                initialValues={{
                  subId: null,
                  title: "",
                  content: "",
                }}
                render={props => (
                  <form onSubmit={(event) => props.handleSubmit(event)}>
                    <Field name="userId" defaultValue={authContext.id} type="hidden" component="input" />
                    <div>
                      <Typography>Community</Typography>
                      <Select name="subId" placeholder="xx">
                        <MenuItem key="default" disabled value="Select Community">Select Community</MenuItem>
                        {userSub.map((sub: any, i: number) => {
                          return <MenuItem
                            key={sub._id + "" + i}
                            value={sub._id}>
                            {sub.SubLongName}
                          </MenuItem>
                        })}
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
                    &nbsp;
                    <MyButton color="primary" onClick={() => props.form.reset()}>
                      Clear
                    </MyButton>
                  </form>
                )}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <br />
    </Container>
  )
}

