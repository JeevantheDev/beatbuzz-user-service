const express = require("express");
const userContoller = require("../controller");
const { saveUser, validUser } = require("../middleware");

const { signup, login, remove } = userContoller;

const router = express.Router();

router.post("/signup", saveUser, signup);
router.post("/login", login);

router.delete("/remove", validUser, remove);

module.exports = router;
