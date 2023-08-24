const mongoose = require('mongoose')
const connectDB = async () => {
  mongoose.set('strictQuery', false)
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('mongo connecté')
  })
}
module.exports = connectDB
