const jwt = require('jsonwebtoken');

const jwtToken = async function (data) {
    const secret = process.env.SECRET_KEY
    const options = {expiresIn: '1h'}
    const token = await jwt.sign(data, secret, options);

    return token;
}

const verifyJwtToken = async function (token) {
    // jwt.compare(token);
    const compare = await jwt.verify(token, process.env.SECRET_KEY);
    
    return compare;
}



module.exports = {
    jwtToken,
    verifyJwtToken,
}