const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { jwtKey, jwtExpiry } = require('../../config/keys');

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    if (bcrypt.compareSync(req.body.password, candidate.password)) {
      const token = jwt.sign({
        id: candidate._id,
        email: candidate.email
      }, jwtKey, { expiresIn: jwtExpiry });
      res.status(200).json({ token: `Bearer ${token}` });
    } else {
      res.status(401).json({
        error: 'wrong_password',
        mesage: 'Пароли не совпадают'
      })
    }
  } else {
    res.status(404).json({
      error: 'not_found',
      message: 'Пользователь не найден'
    })
  }
};


module.exports.register = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    res.status(409).json({
      error: 'already_registered',
      message: 'Пользователь уже существует'
    });
  } else {
    const salt = bcrypt.genSaltSync(10, 10);
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt)
    });
    try {
      await user.save();
      res.status(201).json({message: 'Пользователь создан'});
    } catch (e) {
      res.status(500).json({error: 'internal_error'})
    }
  }
};
