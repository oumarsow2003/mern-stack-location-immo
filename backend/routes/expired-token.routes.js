const express = require('express')
const { addToken } = require('../controllers/expired-token.controller')
const router = express.Router()
router.post('/addToken', addToken)
module.exports = router
