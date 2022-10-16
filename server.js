const http = require('http');
const { createApp } = require('./app');
require('dotenv').config();

const app = createApp();

const server = http.createServer(app);

const PORT = process.env.SERVER_PORT;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
