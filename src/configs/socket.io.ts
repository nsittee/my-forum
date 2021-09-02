import { Server } from 'socket.io'
import http from 'http'

const initSocketIO = (server: http.Server) => {
  const io = new Server(server, {
    cors: { origin: '*' }
  })
  io.on('connection', (socket) => {
    // console.log('############## a user connected ###############')
    socket.on('disconnect', () => {
      // console.log('############## user disconnected ##############')
    })
    socket.onAny((event, username, type, detail) => {
      io.emit(event, username, type, detail)
      // console.log(`${event}:${username}:${type}:${detail}`)
    })
  })
}

export { initSocketIO }