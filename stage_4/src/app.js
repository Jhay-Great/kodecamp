const express = require('express');

// local modules
const router = require('./routes/route');

const app = express();

app.use(express.json())
app.get('/', (req, res) => {
    res.send('endpoint is active');
})

app.use('/stage4', router);
app.use('*', (req, res) => {
    res.status(404).send('Endpoint does not exist') 
})


module.exports = app;