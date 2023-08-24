const express = require('express')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const checkToken = require('../middleware/check-token')
const {
  addAnnonce,
  getAnnonces,
  getOneAnnonce,
  updateAnnonce,
} = require('../controllers/post.controllers')
const { deleteAnnonce } = require('../controllers/post.controllers')
const router = express.Router()

router.get('/', auth, getAnnonces)
router.get('/:id', auth, getOneAnnonce)
router.post('/', auth, multer, addAnnonce)
router.put('/:id', auth, updateAnnonce)
router.delete('/deleteAnnonce/:id', auth, deleteAnnonce)
module.exports = router
