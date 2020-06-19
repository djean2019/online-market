
const Product = require("../models/product-model").productModel;

exports.list = (req, res, next) => {
    Product.find()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errMsg: err });
      });
  };