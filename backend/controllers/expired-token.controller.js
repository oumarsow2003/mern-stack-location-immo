const ExpiredToken = require('../models/expired-token.model.js')
exports.addToken = (req, res, next) => {
  ExpiredToken.create({
    expiredToken: req.body.token,
  })
    .then((token) => res.status(200).json(token))
    .catch((err) => res.status(400).json(err))
}
