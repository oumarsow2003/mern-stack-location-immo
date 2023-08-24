const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    // Récupérez le JWT à partir du cookie
    const token = req.headers.authorization
    const currentUserId = req.headers.currentUserId
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    const userId = decodedToken.userId
    if (currentUserId && currentUserId !== userId) {
      throw 'Invalid user ID'
    } else {
      req.auth = {
        userId: userId,
      }
    }
    next()
  } catch (err) {
    res.status(404).json(err)
  }
}
