// const http = require('http');

// const server = http.createServer();

// server.on('request', (req, res) => {
//     if (req.method === 'POST' && req.url === '/') {
//         req.on('data', (data) => {
//             // res.statusCode = 200;
//             // res.setHeader('Content-Type', 'appliction/json');
//             console.log(data);
//             const reqData = data.toString();
//             const { username, password } = JSON.parse(reqData);

//             if (username !== 'admin' || password !== 'password') {
//                 res.statusCode = 401;
//                 res.end(JSON.stringify( {
//                     message: 'Authentication required'
//                 }))
//             }

            
//         })
//     }
// })

const validation = function(data) {
    const reqData = data.toString();
    const { username, password } = JSON.parse(reqData);

    if (username !== 'admin' || password !== 'password') {
        res.statusCode = 401;
        res.end(JSON.stringify( {
            message: 'Authentication required'
        }))
        
    }
    
}

// const validation = function(req, res) {
//     if (req.method === 'POST' && req.url === '/') {
//         req.on('data', (data) => {
            
//             const reqData = data.toString();
//             const { username, password } = JSON.parse(reqData);

//             if (username !== 'admin' || password !== 'password') {
//                 res.statusCode = 401;
//                 res.end(JSON.stringify( {
//                     message: 'Authentication required'
//                 }))

//                 return false;
//             }

            
//         })
//         return true;
//     }
// }

module.exports = validation;

