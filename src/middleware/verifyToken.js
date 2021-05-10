const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization && authorization.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWS_ACCESS_KEY, (err, user) => {      
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}

module.exports = auth;