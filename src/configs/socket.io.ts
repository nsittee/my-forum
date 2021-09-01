import { Server } from 'socket.io'
import http from 'http'

const initSocketIO = (server: http.Server) => {
  const io = new Server(server, {
    cors: { origin: '*' }
  })
  io.on('connection', (socket) => {
    console.log('############## a user connected ###############')
  })
}

export { initSocketIO }