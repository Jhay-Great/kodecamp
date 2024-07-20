const mongoose = require('mongoose');

const dbConfig = async function() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('Connection established...')

    } catch (error) {
        console.log(`Connection error: ${error.message}`)
    }
}

module.exports = dbConfig;

// const connectDb = async () => {
//     try {
//       await mongoose.connect(process.env.DB_URI);
//       console.log("Connected to database");
//     } catch (error) {
//       console.log(`Error connecting to db, err: ${error.message}`);
//     }
//   };
  
//   module.exports = connectDb;