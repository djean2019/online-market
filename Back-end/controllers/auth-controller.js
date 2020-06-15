const User = require('../models/user-model');
const ResponseApi = require('../models/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt-properties');

exports.signin = async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const isValid = await bcrypt.compare(req.body.password, user.password);
            if (isValid) {
                const token = jwt.sign({ data: req.body.username }, config.jwtKey, {
                    expiresIn: config.jwtExpirySeconds
                });
                res.status(200).send(new ResponseApi(200, 'success', { token: token, expiresIn: config.jwtExpirySeconds, user: user }));
            } else {
                res.status(401).send(new ResponseApi(401, 'error', { err: 'invalid username and/or password' }));
            }

        } else {
            res.status(401).send(new ResponseApi(401, 'error', { err: 'invalid username and/or password' }));
        }
    } catch (err) {
        res.status(500).send(new ResponseApi(500, 'error', err));
    }
}