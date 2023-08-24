const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//Connexion à la base de donnée
connectDB()
const app = express()

// Définir les en-têtes CORS avant les autres middlewares et routes
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3001', 'localhost:3000'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/annonces', require('./routes/annonces.routes'))
app.use('/auth', require('./routes/user.routes'))
app.use('/token', require('./routes/expired-token.routes'))
app.use('/images', express.static(path.join(__dirname, 'images')))
const port = 3000
app.listen(3000, () => console.log('Server is up and running at ' + port))
