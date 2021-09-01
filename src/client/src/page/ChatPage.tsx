import React, { useEffect, useState } from 'react'
import { Card, Container, Paper } from '@material-ui/core'
import { MyCard } from '../components/common/MyCard'

import { io } from 'socket.io-client'
import { MyButton } from '../components/common/MyButton'
import { MyTextField } from '../components/common/MyTextField'

const socket = io('http://localhost:8080')  // TODO: Dynamic address for socket.io
const ChatPage = () => {
  const [message, setMessage] = useState<string>('')
  const [chatFeed, setChatFeed] = useState<JSX.Element[]>([])

  socket.on('message', recMessage => {
    console.log(`recMessage: ${recMessage}`);
    setChatFeed([...chatFeed, <Card key={chatFeed.length}>{recMessage}</Card>])
  })
  useEffect(() => {
    socket.connect()
  }, [])

  return (
    <Container maxWidth="md">
      <br />
      <MyCard header="Chat" />
      <br />
      <MyCard>
        {chatFeed}
      </MyCard>
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
          socket.emit('message', message)
          setMessage('')
        }}>
          Send
        </MyButton>
      </MyCard>
    </Container>
  )
}

export default ChatPage;
