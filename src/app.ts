import express from 'express'
import path from 'path'
import './configs/database-config'
import routes from './routes'
import { initMiddleware } from './middleware'

const app = express()

initMiddleware(app)
app.use('/api', routes)
app.use(express.static(path.join(__dirname, 'build')))
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

export default app