import React, { useContext, useEffect, useState } from 'react'
import { Container, Paper } from '@material-ui/core'
import { MyCard } from '../components/common/MyCard'

import { io, Socket } from 'socket.io-client'
import { MyButton } from '../components/common/MyButton'
import { MyTextField } from '../components/common/MyTextField'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'
import AuthContext from '../context/auth-context'

let socket: Socket<DefaultEventsMap, DefaultEventsMap>
const eventName = 'message'
const ChatPage = () => {
  const authContext = useContext(AuthContext)
  const [message, setMessage] = useState<string>('')
  const [chatFeed, setChatFeed] = useState<string[]>([])

  useEffect(() => {
    const onNewMessage = (newMessage: string) => {
      setChatFeed(c => [...c, newMessage])
    }
    console.log('init client socket io')
    socket = io('http://localhost:8080') // TODO: Dynamic address for socket.io
    socket.connect()
    socket.on(eventName, (username, type, newMessage) => {
      console.log(username, type, newMessage)

      switch (type) {
        case 'message':
          setChatFeed(c => [...c, newMessage])
          break
        case 'typing':
          console.log(`${username} is typing`)
          break
      }
    })
  }, [])

  return (
    <Container maxWidth="md">
      <br />
      <MyCard header="Chat" />
      <br />
      <MyCard>
        {chatFeed.map((message, i) => <Paper key={i}>{message}</Paper>)}
      </MyCard>
      <br />
      <MyCard>
        <MyTextField
          label="Message"
          value={message}
          onChange={(event: any) => {
            const msg = event.target.value
            setMessage(msg)
            if (msg || msg !== '')
              socket.emit(eventName, authContext.username, 'typing')
          }}
        />
        <MyButton onClick={() => {
          socket.emit(eventName, authContext.username, 'message', message)
          setMessage('')
        }}>
          Send
        </MyButton>
      </MyCard>
    </Container>
  )
}

export default ChatPage;
