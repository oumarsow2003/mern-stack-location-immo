const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  adresse: { type: String, required: false },
  about: { type: String, required: false },
  favoris: { type: [String], required: false },
  password: { type: String, required: true },
  photoUrl: { type: String, required: false },
})
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('user', userSchema)
