const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const auth = require("../util/jwt-auth");

router.post("/login", authController.signin);
router.get("/user", auth.verifyToken);

module.exports = router;
