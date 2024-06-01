// node modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// local modules
const userAuthentication = require('./auth');

const server = http.createServer();

server.on('request', (req, res) => {

    // MIDDLEWARE SHOULD BE HERE
    userAuthentication(req, res, routeRequestAndResponses);

    
})

const port = 9000;
server.listen(port, () => {
    console.log(`Running server on port ${port}...`)
})


// ROUTE REQUEST & RESPONSES
const routeRequestAndResponses = function(req, res, next) {
    // login route
    if(req.method === 'POST' && req.url === '/') {
        let data = '';
        req.on('data', (chunk) => {
            data = chunk;
        }).on('end', () => {
            const reqData = JSON.parse(data.toString());
            const {username, password} = reqData;
            

            return res.end(JSON.stringify({
                message: 'login successful'
            }));
        })
    }

    // SIGN UP TO GET BASIC AUTH
    // email address is not required
    else if(req.method === 'POST' && req.url === '/signup') {
        let data = '';
        req.on('data', (chunk) => {
            data = chunk;
        }).on('end', () => {
            const reqData = JSON.parse(data.toString());
            const {username, email, password} = reqData;
            if (!username || !password) {
                res.statusCode = 400;
                return res.end(JSON.stringify({
                    message: 'Incomplete registration'
                }))
            }
            const authKey = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
            res.setHeader('Authorization', authKey);
            return res.end(JSON.stringify({
                message: 'User registered'
            }));
        })
    }
    
    // VIEWING MEMORIES
    else if (req.method === 'GET' && req.url === '/memories') {
        // authentication check
        const key = req.headers.authorization;
        // console.log(key);
        if (!key) {
            return res.end(JSON.stringify({
                message: 'Authentication required'
            }))
        }

        
        let data = '';
        const location = __dirname + '\\' + 'data.json';
        req.on('data', (chunk) => {
            data = chunk;
        })
        .on('end', () => {
            const reader = fs.createReadStream(location); 
            reader.on('data', (chunk) => {
                data = chunk;
            })
            .on('end', () => {
                const memory = JSON.parse(data.toString());
                res.end(JSON.stringify(memory));
            })
        })
    }

    // POST MEMORIES
    else if (req.method === 'POST' && req.url === '/memories') {

                req.on('data', (chunk) => {
            const data = chunk.toString();
            const { content } = JSON.parse(data);

            const newPost = {
                id: generateUniqueIds(),
                content,
            }

            const filePath = path.join(__dirname, 'data.json');
            // read the file to get the content 
            let contents = '';
            const reader = fs.createReadStream(filePath);
            reader.on('data', (chunk) => {
                contents = chunk;
            })
            .on('end', () => {
                let data = JSON.parse(contents.toString());
                // console.log('data: ', data);
                const collection = [...data, newPost];
                // console.log('collection: ', collection);

                // writing into file
                const writer = fs.createWriteStream(filePath);
                writer.write(JSON.stringify(collection));

            })
            
            
        })
        res.end(JSON.stringify({
            message: 'memory published successfully',
        }))
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({
            message: 'Not Found'
        }))
    }

}

// GENERATE ID
const generateUniqueIds = function() {

    const date = new Date();
    const timestamp = Date.now(); // timestamp
    
    const day = date.getDate().toString().padStart(2, 0);
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const year = date.getFullYear();

    return Number(`${day}${month}${year}${timestamp}`)
    
}

