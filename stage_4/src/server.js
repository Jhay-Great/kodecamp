require('dotenv').config();
const http = require('http');

// local modules
const app = require('./app');
const dbConnection = require('./config/db/dbConfig')


const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port, async () => {
    await dbConnection();
    console.log(`Server is running on port ${port}...`)
})