
const database = [
    {id: 23, name: 'emily', email: 'em@gg.com', password: '389ssdlssSa@', admin: false},
]

const resetDatabase = [
    {id: 24,  token: 'sdf08s2342'},
]

const userRegistration = async function (data) {
    const { name, email, password, admin = false, } = data;

    const newUser = {
        id: 82,
        name,
        email,
        password, // should be hashed
        admin,
    };

    database.push(newUser);

    return `registration completed`
    
}


module.exports = {
    database,
    resetDatabase,
    userRegistration,
}