const bcrypt = require("bcrypt");
const db = require("../model");
const jwt = require("jsonwebtoken");

const User = db.users;

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.secretKey, {
    expiresIn: 1 * 24 * 60 * 60 * 1000,
  });

  return token;
};
// signup user

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const data = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
    };

    //saving user
    const user = await User.create(data);

    if (user) {
      const token = generateToken(user.user_id);

      res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

      return res
        .status(201)
        .json({ success: true, data: { ...user, token }, message: null });
    } else {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Details are not correct",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
};

//login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const token = generateToken(user.user_id);
        res.cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60,
          httpOnly: true,
        });
        return res
          .status(201)
          .json({ success: true, message: null, data: { ...user, token } });
      } else {
        return res.status(401).json({
          success: false,
          data: null,
          message: "Authentication failed",
        });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, data: null, message: "Authentication failed" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
};

//delete user
const remove = async (req, res) => {
  try {
    const token = req.cookies.token;

    const data = jwt.verify(token, process.env.secretKey);

    const user = await User.findOne({
      where: {
        user_id: data.id,
      },
    });

    if (user) {
      const deletedUser = await user.destroy();
      res.clearCookie("token");
      return res
        .status(201)
        .json({ success: true, message: null, data: deletedUser });
    } else {
      return res.status(401).json({
        success: false,
        data: null,
        message: "User does not exists!!!",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
};

module.exports = {
  signup,
  login,
  remove,
};
