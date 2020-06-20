const User = require("../models/user-model").userModel;
const ResponseApi = require("../models/response");
const mongoose = require("mongoose");

exports.approuveUser = (req, res, next) => {
    User.updateOne(
        { _id: mongoose.Types.ObjectId(req.params.userId) },
        { $set: { isApprouved: req.params.isApprouved } }
    )
        .then(result => {
            res.status(200).send(new ResponseApi(200, "success", result));
        })
        .catch(err => {
            res.status(500).send(new ResponseApi(500, "error", err));
        });
};
