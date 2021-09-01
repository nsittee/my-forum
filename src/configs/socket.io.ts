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
    socket.on('message', message => {
      console.log(`message: ${message}`)
      // socket.emit('socket message', message)
      io.emit('message', message)
    })
  })
}

export { initSocketIO }