const Product = require('../models/product-model');

exports.insert = (req, res, next) => {
    Product.create(req.body)
        .then(result => {
            res.status(201).send({ id: result._id});
        })
        .catch(err =>{
            res.status(501).send({ errMsg: err});
        })
}

exports.getById = (req, resp, next) => {
    Product.findById(req.params.productId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err});
        })
}

exports.patchById = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            for(let i in req.body)
            product[i] = req.body[i];
            return product.save();
        })
        .catch(err => {
            res.status(204).send({ });
        })
}

exports.removeById = (req, res, next) => {
    Product.findByIdAndDelete(req.params.productId)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send({ errMsg: err});
        })
}

exports.list = (req, res, next) => {
    Product.find()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({errMsg: err});
        })
}

exports.listBySeller = (req, res, next) => {
    Product.findById(req.params.sellerId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({errMsg: err});
        })
}