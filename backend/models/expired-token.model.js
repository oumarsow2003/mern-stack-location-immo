const mongoose = require('mongoose')
const expiredToken = mongoose.Schema({
  expiredToken: { type: String, required: true, unique: true },
})
module.exports = mongoose.model('expired-token', expiredToken)
