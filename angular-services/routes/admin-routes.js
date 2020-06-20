var express = require("express");
var router = express.Router();

const adminController = require("../controllers/admin-controller");

router.post("/admin/:userId/:isApprouved", adminController.approuveUser);

module.exports = router;
