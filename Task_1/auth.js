const userAuthentication = function(req, res, next) {
    // handling 
    if (!req.headers.authorization) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.end(JSON.stringify({
            message: 'Authentication required'
        }))
    }
    
    const auth = req.headers.authorization;
    const [authScheme, base64] = auth.split(' ');
    
    // decoding basic authentication or handling authentication
    // const encode = atob(base64);
    const encode = Buffer.from(base64, 'base64').toString('utf-8');
    const [username, password] = encode.split(':');
    
    // handling wrong authentications
    if (authScheme !== 'Basic' || username !== 'admin' || password !== 'password') {
        res.statusCode = 401;
        return res.end(JSON.stringify({
            message: 'Authentication required'
        }))
    }

    next();

}

module.exports = userAuthentication;