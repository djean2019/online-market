const User = require("../models/user-model").userModel;
const ResponseApi = require("../models/response");
const bcrypt = require("../util/bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt-properties");

exports.signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.user.email });
    if (user) {
      const isValid = await bcrypt.compareSync(
        req.body.user.password,
        user.password
      );
      if (isValid) {
        const token = jwt.sign({ user: user }, config.jwtKey, {
          expiresIn: config.jwtExpirySeconds,
        });
        res.status(200).send({
          token: token,
          expiresIn: config.jwtExpirySeconds,
          user: user,
        });
      } else {
        res.status(401).send({
          errors: { "email and/or password": ["is invalid"] },
        });
      }
    } else {
      res.status(401).send({
        errors: { "email and/or password": ["is invalid"] },
      });
    }
  } catch (err) {
    res.status(500).send({
      errors: { server: ["error"] },
    });
  }
};
