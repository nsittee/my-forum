// path.resolve(process.cwd(), 'env/.env.development.local')
const path = require('path');
path.resolve(process.cwd(), 'env/.env.development.local')

require('dotenv').config({ path: path.resolve(process.cwd(), 'env/.env.local') })

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on ${port}`)
});