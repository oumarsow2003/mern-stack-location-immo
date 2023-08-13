const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const cors = require('cors')
//Connexion à la base de donnée
connectDB()
const app = express()
app.use(cors())
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/annonces', require('./routes/annonces.routes'))
app.use('/auth', require('./routes/user.routes'))
app.listen(3000, () => console.log('Server is up and running at ' + port))
