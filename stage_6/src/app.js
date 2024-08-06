const express = require('express');

// local imports
const baseRoutes = require('./routes/index.routes');

const app = express();

app.use(express.json())
app.get('/', (req, res) => {
    res.send('endpoint is active');
})

app.use('/stage6', baseRoutes);
app.use('*', (req, res) => {
    res.status(404).send('Endpoint does not exist') 
})

module.exports = app;