
const User = require("../models/user-model").userModel;
const Product = require("../models/product-model").productModel;
const mongoose = require("mongoose");
const bcrypt = require("../util/bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt-properties");

exports.insert = (req, res, next) => {
    req.body.user.password = bcrypt.encodeSync(req.body.user.password);
    User.create(req.body.user)
    .then((result) => {
        result.password = null;
        const token = jwt.sign({ user: result }, config.jwtKey, {
            expiresIn: config.jwtExpirySeconds,
        });
        res.status(201).send({
            token: token,
            expiresIn: config.jwtExpirySeconds,
            user: result,
        });
    })
    .catch((err) => {
        res.status(500).send({ errMsg: err });
    });
};

exports.getById = (req, res, next) => {
    User.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
            console.log(result);
        })
        .catch((err) => {
            res.status(500).send({ errMsg: err });
    });
};

    exports.patchById = (req, res, next) => {
    User.findById(req.params.userId)
        .then((user) => {
        for (let i in req.body) {
            user[i] = req.body[i];
        }
        return user.save();
        })
        .then((result) => {
        res.status(204).send({});
        });
    };

    exports.list = (req, res, next) => {
    User.find()
        .then((result) => {
        res.status(200).send(result);
        })
        .catch((err) => {
        res.status(500).send({ errMsg: err });
        });
    };

exports.removeById = (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
        res.status(500).send({ errMsg: err });
    });
};
