const ExpiredToken = require('../models/expired-token.model.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  ExpiredToken.findOne({ expiredToken: token })
    .then((token) => {
      if (token) {
        res.status(401).json({ message: 'Unauthorized' })
      } else {
        next()
      }
    })
    .catch((err) => res.status(400).json(err))
}
