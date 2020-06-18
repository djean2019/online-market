const ResponseApi = require("../models/response");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt-properties");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(403)
      .send(new ResponseApi(403, "error", { err: "No Token Provided..." }));
  }
  const token = authHeader.split(" ")[1];
  //console.log(token);

  jwt.verify(token, config.jwtKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send(new ResponseApi(401, "error", { err: "Unauthorized user..." }));
    }
    res.status(200).send({
      user: decoded.user,
      token: token,
    });
  });
};
