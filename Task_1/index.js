// node modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');



const server = http.createServer();


const port = 9000;
server.listen(port, () => {
    console.log(`Running server on port ${port}...`)
})

server.on('request', (req, res) => {

    // MIDDLEWARE SHOULD BE HERE

    
    
    
    if(req.method === 'POST' && req.url === '/') {
        let data = '';
        req.on('data', (chunk) => {
            data = chunk;
        }).on('end', () => {
            const reqData = JSON.parse(data.toString());
            const {username, password} = reqData;
            if (username !== 'admin' || password !== 'password') {
                res.statusCode = 401;
                return res.end(JSON.stringify({
                    message: 'Authentication required'
                }))
            }
            const authKey = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
            res.setHeader('Authorization', authKey);
            return res.end(JSON.stringify({
                message: 'User authenticated'
            }));
        })
    }

    // sign up
    if(req.method === 'POST' && req.url === '/signup') {
        let data = '';
        req.on('data', (chunk) => {
            data = chunk;
        }).on('end', () => {
            const reqData = JSON.parse(data.toString());
            const {username, email, password} = reqData;
            if (!username || !password || !email) {
                res.statusCode = 400;
                return res.end(JSON.stringify({
                    message: 'Incomplete registration'
                }))
            }
            const authKey = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
            res.setHeader('Authorization', authKey);
            return res.end(JSON.stringify({
                message: 'User authenticated'
            }));
        })
    }
    // GET MEMORIES
    // const link = url.parse(req.url);
    // console.log(link);

    
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
})







// // node modules
//   const http = require('http');
//   const fs = require('fs');
//   const path = require('path');
//   const url = require('url');
  

// //   local packages || modules
//   const auth = require('./auth');

// const port = 9000;

// const server = http.createServer();

// server.on('request', function(req, res) {
//     // SIGN UP OR LOGIN VALIDATION
//     if (req.method === 'POST' && req.url === '/') {
        
//         // req.on('data', auth)
        
        
//         req.on('data', (data) => {
//             const reqData = data.toString();
//             const {username, password} = JSON.parse(reqData);
            
//             if (username !== 'admin' || password !== 'password') {
//                 res.statusCode = 401;
//                 res.end(JSON.stringify( {
//                     message: 'Authentication required'
//                 }));
//             }
//         })

//         // CREATING MIDDLEWARE FUNCTION FUNCTIONALITY
//         // req.on('data', auth)

//         .on('end', () => {
//             // console.log('done')
//             res.end(JSON.stringify({
//                 message: 'User verified',
//             }));
//         })
//     }

//     // VIEW MEMORIES ENDPOINT
//     if (req.method === 'GET' && req.url === '/memories') {

//         // const link = url.parse(req.url, true);
//         // console.log(link);
        
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         let memory;

//         const location = path.join(__dirname, 'data.json');

//         // Read file as stream
//         const content = fs.createReadStream(location);
//         content.on('data', (chunk) => {
//             memory = chunk;
//         })
//         .on('end', () => {
//             let memories = JSON.parse(memory.toString())
//             res.end(JSON.stringify(memories))

//         })

//     }

//     // POST MEMORIES ENDPOINT
//     if (req.method === 'POST' && req.url === '/memories') {
//         req.on('data', (chunk) => {
//             const data = chunk.toString();
//             const { content } = JSON.parse(data);
//             // console.log(post);

//             const newPost = {
//                 id: generateUniqueIds(),
//                 content,
//             }
//             // console.log(newPost);

//             const filePath = path.join(__dirname, 'data.json');
//             // read the file to get the content 
//             let contents = '';
//             const reader = fs.createReadStream(filePath);
//             reader.on('data', (chunk) => {
//                 contents = chunk;
//             })
//             .on('end', () => {
//                 let data = JSON.parse(contents.toString());
//                 // console.log('data: ', data);
//                 const collection = [...data, newPost];
//                 // console.log('collection: ', collection);

//                 // writing into file
//                 const writer = fs.createWriteStream(filePath);
//                 writer.write(JSON.stringify(collection));

//             })
            
            
//         })
//         res.end(JSON.stringify({
//             message: 'memory published successfully',
//         }))
//     }
    
// })




// server.listen(port, () => {
//     console.log(`Server is running on port ${port}...`)
// })

// const middlewares = function(middleware) {
//     let index = 0;
//     let size = middleware.length;

//     while (index < size) {

//     }
// };

// const isVerified = function(req, res, next) {
//     let incomingData = '';
//     req.on('data', (chunk) => {
//         incomingData = chunk;
//     })
//     .on('end', () => {
//         const data = JSON.parse(incomingData.toString())

//     })
// }

// todos
// have to return user_id when user is verified due to point 6 & 7
// memory endpoint => GET || POST /api/:user_id/memories
// before users can view or post they need to be authenticated
// another middleware to check it the url params is admin

/**generate id based on timestamp
 // git remote add origin git@github.com:Jhay-Great/kodecamp.git
 * concatenate today's date and time stamp
 * get day, month, year, and timestamp
 */
const generateUniqueIds = function() {

    const date = new Date();
    const timestamp = Date.now(); // timestamp
    
    const day = date.getDate().toString().padStart(2, 0);
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const year = date.getFullYear();

    return Number(`${day}${month}${year}${timestamp}`)
    
}