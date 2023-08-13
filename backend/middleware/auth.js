const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    const userId = decodedToken.userId
    req.auth = {
      userId: userId,
    }

    next()
  } catch (err) {
    res.status(404).json(err)
  }
}
