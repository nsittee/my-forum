import React, { useContext, useEffect, useState } from 'react'
import { Container, Paper } from '@material-ui/core'
import { MyCard } from '../components/common/MyCard'

import { io, Socket } from 'socket.io-client'
import { MyButton } from '../components/common/MyButton'
import { MyTextField } from '../components/common/MyTextField'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'
import AuthContext from '../context/auth-context'
import appConstant from '../constant/app-constant'

let socket: Socket<DefaultEventsMap, DefaultEventsMap>
const eventName = 'message'
const ChatPage = () => {
  const authContext = useContext(AuthContext)
  const [prevMessage, setPrevMessage] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [chatFeed, setChatFeed] = useState<string[]>([])
  const [typingList, setTypingList] = useState<string[]>([])

  useEffect(() => {
    socket = io(appConstant.URL!)
    socket.connect()
    socket.on(eventName, (username, type, newMessage) => {
      // console.log(username, type, newMessage)
      switch (type) {
        case 'message':
          setChatFeed(c => [...c, newMessage])
          break
        case 'typing':
          console.log(`${username} is typing`)
          setTypingList(t => [...t, username])
          break
        case 'nottyping':
          setTypingList(t => t.filter(e => e !== username))
          break
      }
    })
  }, [])

  const onSendMessage = () => {
    socket.emit(eventName, authContext.username, 'message', message)
    socket.emit(eventName, authContext.username, 'nottyping')
    setPrevMessage('')
    setMessage('')
  }

  return (
    <Container maxWidth="md">
      <br />
      <MyCard header="Chat" />
      <br />
      <MyCard>
        {chatFeed.map((message, i) => <Paper key={i}>{message}</Paper>)}
        <div>
          {typingList.map((typer, i) => <Paper key={typer + i}>{typer} is typing...</Paper>)}
        </div>
      </MyCard>
      <br />
      <MyCard>
        <MyTextField
          value={message}
          onChange={(event: any) => {
            const prev = prevMessage
            const msg = event.target.value
            // console.log(prev, msg)

            if ((prev === '' || !prev) && msg !== '')
              socket.emit(eventName, authContext.username, 'typing')
            if ((msg === '' && prev !== ''))
              socket.emit(eventName, authContext.username, 'nottyping')

            setPrevMessage(msg)
            setMessage(msg)
          }}
        />
        <MyButton onClick={onSendMessage}>
          Send
        </MyButton>
      </MyCard>
    </Container >
  )
}

export default ChatPage;
