const User = require('../models/user-model');

exports.insert = (req, res, next) => {
    User.create(req.body)
        .then(result => {
            res.status(201).send({ id: result._id });
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
};

exports.getById = (req, res, next) => {
    User.findById(req.params.userId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
};

exports.patchById = (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => {
            for (let i in req.body) {
                user[i] = req.body[i];
            }
            return user.save();
        })
        .then(result => {
            res.status(204).send({});
        });
};

exports.list = (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200).send(users);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
}

exports.removeById = (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
};
<<<<<<< HEAD

=======
>>>>>>> dc7bc2ca36c2e4d1de7afc7303db8457e53a09a8
