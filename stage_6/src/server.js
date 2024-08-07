require('dotenv').config();
const http = require('http');

// local imports
const app = require('./app');
const mongoDatabaseConnection = require('./config/dbConfig');

const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port, async () => {
    await mongoDatabaseConnection();
    console.log(`Server is running on ${port}...`)
})