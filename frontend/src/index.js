import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import { AppContextProvider } from './utils/Context'
import Login from './components/Login'
import Home from './components/Home'
import EditAnnonce from './components/EditAnnonce'
import Annonce from './components/Annonce'
import Profil from './components/Profil'
import Signup from './components/Signup'
const root = ReactDOM.createRoot(document.getElementById('root'))
axios.defaults.headers.common['Authorization'] =
  window.localStorage.getItem('token') || ''
console.log(process.env.REACT_APP_BASE_URI)
root.render(
  <AppContextProvider>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/editAnnonce/:idAnnonce" element={<EditAnnonce />} />
          <Route path="/annonce/:idAnnonce" element={<Annonce />} />
          <Route path="/profil/:id" element={<Profil />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </React.StrictMode>
  </AppContextProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
