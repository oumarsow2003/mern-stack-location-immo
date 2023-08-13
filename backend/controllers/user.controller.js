const User = require('../models/user.model')
const Annonce = require('../models/annonce.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.signin = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        ...req.body,
        password: hash,
      })
        .then((user) => res.satus(200).json(user))
        .catch((err) => res.status(400).json(err))
    })
    .catch((err) => res.status(400).json(err))
}
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Email/mot de passe incorrect' })
      }
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res
            .status(404)
            .json({ message: 'Email/mot de passe incorrect' })
        }
        res.json({
          userId: user._id,
          token: jwt.sign(
            {
              userId: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '24h',
            }
          ),
        })
      })
    })
    .catch((err) => res.status(400).json(err))
}
exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' })
      }
      res.status(200).json(user.email)
    })
    .catch((err) => res.status(400).json(err))
}
exports.getCurrentUser = (req, res, next) => {
  User.findById(req.auth.userId)
    .select('-password')
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => res.status(400).json(err))
}
exports.getUserAnnonces = (req, res, next) => {
  Annonce.find({ authorId: req.params.id })
    .then((annonces) => res.status(200).json(annonces))
    .catch((err) => res.status(400).json(err))
}
