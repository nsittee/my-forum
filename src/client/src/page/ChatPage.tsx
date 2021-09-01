import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { MyCard } from '../components/common/MyCard'

import { io } from 'socket.io-client'
import { MyButton } from '../components/common/MyButton'
import { MyTextField } from '../components/common/MyTextField'

const ChatPage = () => {
  const [message, setMessage] = useState<string>('')
  const socket = io('http://localhost:8080')  // TODO: Dynamic address for socket.io

  useEffect(() => {
    socket.connect()
  }, [socket])

  return (
    <Container maxWidth="md">
      <br />
      <MyCard header="Chat" />
      <br />
      <MyCard>
        <MyTextField
          label="Message"
          value={message}
          onChange={(event: any) => setMessage(event.target.value)}

        />
        <MyButton onClick={() => {
          console.log(`send => ${message}`)
          socket.send(message)
          setMessage('')
        }}>
          Send
        </MyButton>
      </MyCard>
    </Container>
  )
}

export default ChatPage;
