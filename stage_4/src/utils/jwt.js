const jwt = require('jsonwebtoken');

const jwtToken = async function (data) {
    const secret = process.env.SECRET_KEY
    const options = {expiresIn: '1h'}
    const token = await jwt.sign(data, secret, options);

    return token;
}



module.exports = {
    jwtToken,
}


// const jwtToken = async function (data) {
//   const secret = process.env.SECRET_KEY;
//   const options = { expiresIn: '1h' };

//   try {
//     // Await the promise returned by jwt.sign
//     const token = await jwt.sign(data, secret, options);
//     console.log('in jwt signing: ', token);
//     return token;
//   } catch (err) {
//     console.error('Error signing JWT:', err);
//     throw new Error('Error occurred during JWT signing'); // Or handle the error differently
//   }
// };
