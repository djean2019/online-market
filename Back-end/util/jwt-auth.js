const ResponseApi = require('../models/response');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt-properties');

exports.verifyToken = (req, res, next) => {
    console.log(req.headers);
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).send(new ResponseApi(403, 'error', { err: 'No Token Provided!' }));
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwtKey, (err, decoded) => {
        if (err) {
            return res.status(401).send(new ResponseApi(401, 'error', { err: 'Unauthorized user!' }));
        }
        next();
    });
}