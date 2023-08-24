const mongoose = require('mongoose')

const annonceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    surface: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    nombrePieces: {
      type: Number,
      required: false,
    },
    isHidden: {
      type: Boolean,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('annonces', annonceSchema)
