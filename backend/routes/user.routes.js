const express = require('express')
const {
  signup,
  login,
  getUser,
  getCurrentUser,
  getUserAnnonces,
  addFavori,
  getFavoris,
  deleteFavori,
} = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const router = express.Router()

router.post('/signup', multer, signup)
router.post('/login', login)
router.get('/user/:id', auth, getUser)
router.get('/currentUser', auth, getCurrentUser)
router.get('/getUserAnnonces/:id', auth, getUserAnnonces)
router.patch('/addToFavoris/', auth, addFavori)
router.get('/getUserFavoris/:userId', auth, getFavoris)
router.patch('/deleteFavori/', auth, deleteFavori)
module.exports = router
