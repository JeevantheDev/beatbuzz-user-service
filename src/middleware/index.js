const db = require("../model");
const jwt = require("jsonwebtoken");

const User = db.users;

const saveUser = async (req, res, next) => {
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    //check username
    if (username) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "username already exists!!!",
      });
    }

    // check email
    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailCheck) {
      return res
        .status(409)
        .json({ success: false, data: null, message: "Authentication failed" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
};

const validUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    console.log(token);

    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "token is invalid", data: null });
    }

    jwt.verify(token, process.env.secretKey, (error, user) => {
      if (error) {
        return res
          .status(401)
          .json({ success: false, message: "token is expired!!!", data: null });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
};

//exporting module
module.exports = {
  saveUser,
  validUser,
};
