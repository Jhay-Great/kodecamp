const bcrypt = require('bcrypt');

const hashPassword = async function (password) {
    const result = await bcrypt.hash(password, 10);
    return result;
}

const comparePassword = async function (password, storedPassword) {
    const result = await bcrypt.compare(password, storedPassword); 
    return result;
}


module.exports = {
    hashPassword,
    comparePassword,
}