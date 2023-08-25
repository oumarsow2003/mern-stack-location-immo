const User = require('../models/user.model')
const Annonce = require('../models/annonce.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        ...req.body,
        password: hash,
        photoUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      })
        .then((user) => {
          const token = jwt.sign(
            {
              userId: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '24h',
            }
          )
          res.status(200).json({ userId: user._id, token })
        })
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
        const token = jwt.sign(
          {
            userId: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '24h',
          }
        )
        res.status(200).json({ userId: user._id, token })
      })
    })
    .catch((err) => res.status(400).json(err))
}

exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' })
      }
      res.status(200).json(user)
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

exports.addFavori = (req, res, next) => {
  const userId = req.auth.userId
  const favori = req.body

  User.findByIdAndUpdate(
    userId,
    { $addToSet: { favoris: favori } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}
exports.deleteFavori = (req, res, next) => {
  const userId = req.auth.userId
  const favoriId = req.body.annonceId

  User.findByIdAndUpdate(
    userId,
    { $pull: { favoris: favoriId } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}

exports.getFavoris = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const favorisIds = user.favoris
    const favoris = await Annonce.find({ _id: { $in: favorisIds } })
    res.status(200).json(favoris)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}
