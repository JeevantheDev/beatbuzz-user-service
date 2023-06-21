const express = require("express");
const userContoller = require("../controller");
const { saveUser, validUser } = require("../middleware");

const { signup, login, remove, validToken } = userContoller;

const router = express.Router();

router.get("/validToken", validToken);
router.post("/signup", saveUser, signup);
router.post("/login", login);

router.delete("/remove", validUser, remove);

module.exports = router;
