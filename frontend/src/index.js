import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { AppContextProvider } from './utils/Context'
import Login from './components/Login'
import Home from './components/Home'
import EditAnnonce from './components/EditAnnonce'
import Annonce from './components/Annonce'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AppContextProvider>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/editAnnonce/:idAnnonce" element={<EditAnnonce />} />
          <Route path="/annonce/:idAnnonce" element={<Annonce />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </AppContextProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
