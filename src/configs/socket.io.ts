import { Server } from 'socket.io'
import http from 'http'

const initSocketIO = (server: http.Server) => {
  const io = new Server(server, {
    cors: { origin: '*' }
  })
  io.on('connection', (socket) => {
    console.log('############## a user connected ###############')
    socket.on('disconnect', () => {
      console.log('############## user disconnected ##############');
    })
    socket.onAny((eventName, message) => {
      io.emit(eventName, message)
      console.log(`${eventName}: ${message}`)
    })
    // socket.on('message', message => {
    //   console.log(`message: ${message}`)
    //   io.emit('message', message)
    // })
  })
}

export { initSocketIO }