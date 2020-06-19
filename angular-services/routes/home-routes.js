var express = require("express");
var router = express.Router();

const homeController = require("../controllers/home-controller");
const buyerController = require("../controllers/buyer-controller");

router.get("/home", homeController.list);
router.get("/products", buyerController.list);

module.exports = router;
