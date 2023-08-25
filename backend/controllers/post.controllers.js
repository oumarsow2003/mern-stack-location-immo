const AnnonceModel = require('../models/annonce.model')
const upload = require('../middleware/multer-config')

exports.addAnnonce = (req, res) => {
  const newAnnonce = AnnonceModel.create({
    ...req.body,
    authorId: req.auth.userId,
    isHidden: false,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  })
    .then((annonce) => res.json(annonce))
    .catch((err) => res.status(400).json(err))
}
exports.getAnnonces = (req, res) => {
  AnnonceModel.find()
    .then((annonces) => res.json(annonces))
    .catch((err) => res.json(err))
}
exports.getOneAnnonce = (req, res) => {
  AnnonceModel.findById(req.params.id)
    .then((annonce) => {
      if (!annonce) {
        return res.status(404).json({ message: 'Not Found' })
      }
      res.status(200).json(annonce)
    })
    .catch((err) => res.status(400).json(err))
}
exports.updateAnnonce = (req, res) => {
  AnnonceModel.findById(req.params.id).then((annonce) => {
    if (annonce.authorId !== req.auth.userId) {
      res.status(401).json({ message: 'Not authorized' })
    } else {
      AnnonceModel.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
      ).then(res.status(200).json({ message: 'Modifié avec succès' }))
    }
  })
}
exports.deleteAnnonce = (req, res) => {
  AnnonceModel.findById(req.params.id).then((annonce) => {
    if (annonce.authorId !== req.auth.userId) {
      res.status(401).json({ message: 'Not authorized' })
    } else {
      AnnonceModel.deleteOne({ _id: req.params.id }).then(
        res.status(200).json({ message: 'Supprimé avec succès' })
      )
    }
  })
}
