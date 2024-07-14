require('dotenv').config();
const http = require('http');

// local modules
const app = require('./app');

const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})