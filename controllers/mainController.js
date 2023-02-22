const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const SaltRounds = 10;

exports.userlogin = async (req, res, next) => {
  const email = req.body.email;
  const pswd = req.body.password;
  try {
    const user = await User.findOne({
      email: email,
    });
    const isvalid = bcrypt.compare(pswd, user.pswd);

    if (isvalid) {
      res.json({
        status: "login successfull",
        token: generateaccesstoken({ email: email }),
      });
    } else {
      res.json({
        status: "login unsuccessfull",
      });
    }
  } catch (err) {
    res.json({
      status: "failed",
    });
  }
};

exports.userSignup = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const pswd = req.body.password;
  try {
    bcrypt.hash(pswd, SaltRounds, async (err, data) => {
      const user = new User({
        email: email,
        username: username,
        pswd: data,
      });
      await user.save();
      res.json({
        status: "success",
      });
    });
  } catch (err) {
    res.json({
      status: "failed",
    });
  }
};

exports.getUser = async (req, res, next) => {
  const user = req.user;
  const obj = {
    name: user.username,
    email: user.email,
  };
  res.json({
    status: "success",
    user: obj,
  });
};

exports.deleteuser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({
        status: "deletion successfull"
    })
  } catch (err) {
    res.json({
      status: "failed",
    });
  }
};

exports.updateuser = async (req,res) => {
    const updatedUsername = req.body.username;
    const updatedEmail = req.body.email;
    const updatedpswd = req.body.password;
    const userid = req.user._id;
    try {
        await User.findByIdAndUpdate(userid, {
            email: updatedEmail,
            username: updatedUsername,
            pswd: updatedpswd
        })
        res.json({
            status: "updation successfull"
        })
      } catch (err) {
        res.json({
          status: "failed",
        });
      }
}

function generateaccesstoken(data) {
  return JWT.sign(data, process.env.TOKEN_SECRET, { expiresIn: "10m" });
}
