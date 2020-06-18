const Product = require("../models/product-model").productModel;
const ResponseApi = require("../models/response");
const mongoose = require("mongoose");

exports.insert = (req, res, next) => {
  Product.create(req.body)
    .then((result) => {
      res.status(201).send({ id: result._id });
    })
    .catch((err) => {
      res.status(501).send({ errMsg: err });
    });
};

exports.getById = (req, resp, next) => {
  Product.findById(req.params.productId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errMsg: err });
    });
};

exports.patchById = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      for (let i in req.body) product[i] = req.body[i];
      return product.save();
    })
    .catch((err) => {
      res.status(204).send({});
    });
};

exports.removeById = (req, res, next) => {
  Product.findByIdAndDelete(req.params.productId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errMsg: err });
    });
};

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

exports.listBySeller = (req, res, next) => {
  let selId = req.params.sellerId;
  Product.aggregate([{ $match: { userId: mongoose.Types.ObjectId(selId) } }])
    .then((result) => {
      res.status(200).send(new ResponseApi(200, "success", result));
    })
    .catch((err) => {
      res.status(500).send(new ResponseApi(500, "error", err));
    });
};

exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);

  Product.findById(prodId)
    .then((product) => {
      console.log(product);

      // const userId = product.userId;
      // User.updateOne(
      //     {_id: mongoose.Types.ObjectId(userId)}, {$push: {"cart":product}}
      // )
      // .then(result => {
      //     res.status(200).send(new ResponseApi(200, 'success', result));
      // })
      // .catch(err => {
      //     res.status(500).send(new ResponseApi(500, 'error', err));
      // });
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
