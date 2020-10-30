import React, { useContext, useState } from "react";
import { Button, Card, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useCookies } from "react-cookie";
import AuthContext from '../../context/auth-context'

const CreateThreadForm = () => {
  const [community, setCommunity] = useState('')
  const authContext = useContext(AuthContext)

  const handleChange = (event) => {
    setCommunity(event.target.value)
  }
  const getMyCommunity = () => {
    console.log(authContext.userSub)
    return authContext.userSub.map(sub => {
      console.log(sub)
      return <MenuItem value={sub._id}> {sub.SubLongName} </MenuItem>
    })
  }
  getMyCommunity()

  return (
    <div>
      <form autoComplete="off">
        <Card>
          <InputLabel>Select Community</InputLabel>
          <Select
            value={community}
            onChange={event => handleChange(event)}
            fullWidth={true}>
            {getMyCommunity()}
          </Select>
        </Card>
        <Card>
          <h5>Input control</h5>

          <Button variant="contained" color="secondary">
            Submit </Button>
        </Card>
      </form>

    </div>
  );
}

export default CreateThreadForm;