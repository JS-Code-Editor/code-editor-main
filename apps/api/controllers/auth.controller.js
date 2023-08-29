const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const User = require('../models/user.model');
const { googleAuthUrl, oauth2Client } = require('../configs/googleAuth');

const key = process.env.TOKEN_KEY;

exports.getGoogleAuthUrl = async (req, res) => {
  res.json({
    url: googleAuthUrl,
  });
};

exports.getToken = async (req, res, next) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.body.code);

    const { data: userInfo } = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const user = await User.findOne({ email: userInfo.email }).exec();
    let userId;

    if (!user) {
      const { _id } = await User.create({
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
        email: userInfo.email,
        avatar: userInfo.picture,
      });
      userId = _id;
    } else {
      userId = user._id;
    }

    const token = jwt.sign({ id: userId }, key, {
      expiresIn: '1 day',
    });

    res.status(200).json({ access_token: token });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

exports.signup = ({ body: { email, password } }, res, next) => {
  const user = new User({
    email,
    password: bcrypt.hashSync(password, 8),
  });

  user.save((err, user) => {
    if (err) {
      err.status = 500;

      return next(err);
    }

    const token = jwt.sign({ id: user._id }, key, {
      expiresIn: '1 day',
    });
    res.status(200).json({
      access_token: token,
    });
  });
};

exports.signin = ({ body: { email, password } }, res, next) => {
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      err.status = 500;

      return next(err);
    }
    console.log(user);

    if (!user) {
      const err = new Error('User Not found.');
      err.status = 404;

      return next(err);
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      const err = new Error('Invalid Password!');
      err.status = 401;

      return next(err);
    }

    const token = jwt.sign({ id: user._id }, key, {
      expiresIn: '1 day',
    });

    res.status(200).json({
      access_token: token,
    });
  });
};
