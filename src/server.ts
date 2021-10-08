import './configs/environment'
import http from 'http'
import app from './app'
import { initSocketIO } from './configs/socket.io'

const port = process.env.PORT || 5000
const server = http.createServer(app)
initSocketIO(server)

server.listen(port, () => {
  console.log(`Server is running on ${port}`)
});