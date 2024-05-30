// node modules
  const http = require('http');
  const fs = require('fs');
  const path = require('path');
  

//   local packages || modules
  const auth = require('./auth');
//   const data = require('./data.json');

const port = 9000;

const server = http.createServer();

server.on('request', function(req, res) {
    // SIGN UP OR LOGIN VALIDATION
    if (req.method === 'POST' && req.url === '/') {
        
        // req.on('data', auth);
        // res.end('done');
        // req.on('data', auth);
        
        
        req.on('data', (data) => {
            const reqData = data.toString();
            const {username, password} = JSON.parse(reqData);
            
            if (username !== 'admin' || password !== 'password') {
                res.statusCode = 401;
                res.end(JSON.stringify( {
                    message: 'Authentication required'
                }));
            }
        })

        // CREATING MIDDLEWARE FUNCTION FUNCTIONALITY
        // req.on('data', auth)

        .on('end', () => {
            // console.log('done')
            res.end(JSON.stringify({
                message: 'User verified',
            }));
        })
    }

    // VIEW MEMORIES ENDPOINT
    if (req.method === 'GET' && req.url === '/memories') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        let memory;

        const location = path.join(__dirname, 'data.json');

        // Read file as stream
        const content = fs.createReadStream(location);
        content.on('data', (chunk) => {
            memory = chunk;
        })
        .on('end', () => {
            let memories = JSON.parse(memory.toString())
            res.end(JSON.stringify(memories))

        })

    }

    // POST MEMORIES ENDPOINT
    if (req.method === 'POST' && req.url === '/memories') {
        req.on('data', (chunk) => {
            const data = chunk.toString();
            const { content } = JSON.parse(data);
            // console.log(post);

            const newPost = {
                id: generateUniqueIds(),
                content,
            }
            // console.log(newPost);

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

    // GENERAL TEST
    // if (req.method === 'GET' && req.url === '/') {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');

    //     res.end(JSON.stringify({
    //         message: 'Hello there',
    //     }))
    // } else {
    //     res.statusCode = 404;
    //     res.end();
    // }
})

// const location = path.join(__dirname, 'data.json'); 

// const writing = fs.writeFile(location, (err, data) => { 
//     if (err) {
//         console.log(err)
//     };
//     console.log(data);
// })

// const writeToFile = function() {

// }

/**generate id based on timestamp
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

// const location = __dirname + '\\' + 'data.json';

// const readFileContent = function(file) {
//     let data = {}
//     let newContent = 'hello there';

//     // creating an object from input memory
//     const post = {
//         id: generateUniqueIds(),
//         content: newContent,
//     }

//     // Reading the file 
//     const content = fs.createReadStream(file);

//     content.on('data', (chunks) => {
//         data = chunks
//         console.log(data.toString())
//     })
//     .on('end', () => {
//         // changing json string to json object to perform js operations
//         const content = JSON.parse(data.toString());
//         const values = [
//             ...content,
//             post,
//         ];
//         console.log(values)

//         // changing the json object to a json string
//         const jsonData = JSON.stringify(values);
//         console.log(jsonData);
//     })

//     /** OPTIONS
//      * consider parsing it as a json object
//      * then parsing it as a json string again
//      */
    
//     // fs.readFile(file, 'utf-8', (err, data) => {
//     //     if (err) {
//     //         console.log(err);
//     //         throw err;
//     //     }

//     //     console.log(data);

//     //     // content = {
//     //     //     data,
//     //     // }

//     //     // console.log(content);
        
//     // })

//     // console.log(content);
// }

// const fileContent = function(file) {
//     let data;
//     const content = fs.createReadStream(file);
//     content.on('data', (chunk) => {
//         data = chunk;
//     })
//     .on('end', () => {
//         const readData = data.toString();
//         // console.log(readData);
//         // final = readData; 
//         return readData;
//         console.log(readData)
//         // res.end(JSON.stringify(readData))
//     });
//     // return final;
// }

// console.log(fileContent(location))

// readFileContent(location);

// Writing into the file
// const writeIntoFile = function(filename, content) {

//     const contents = fs.createWriteStream(filename, {flags: 'a'});
//     contents.write(content);

// }




server.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})