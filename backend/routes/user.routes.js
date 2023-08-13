const express = require('express')
const {
  signin,
  login,
  getUser,
  getCurrentUser,
  getUserAnnonces,
} = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/signin', signin)
router.post('/login', login)
router.get('/user/:id', auth, getUser)
router.get('/currentUser', auth, getCurrentUser)
router.get('/getUserAnnonces/:id', auth, getUserAnnonces)
module.exports = router
