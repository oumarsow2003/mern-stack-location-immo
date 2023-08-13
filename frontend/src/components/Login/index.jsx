import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [user, setUser] = useState()
  const navigate = useNavigate()
  const updateData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const checkAuth = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('token')
    user?.email &&
      user?.password &&
      axios
        .post('http://localhost:3000/auth/login', { ...user })
        .then((response) => {
          if (response.data.message) {
            console.log(response.data.message)
            navigate('/')
          } else {
            window.localStorage.setItem('token', response.data.token)
            window.localStorage.setItem('userId', response.data.userId)
            navigate('/home')
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }
  return (
    <div>
      <h1>Login Page</h1>
      <form action="" method="post">
        <input
          type="text"
          onChange={(e) => updateData(e)}
          name="email"
          placeholder="Email"
        />
        <input
          type="text"
          onChange={(e) => updateData(e)}
          name="password"
          placeholder="Password"
        />
        <button onClick={checkAuth}>Valider</button>
      </form>
    </div>
  )
}

export default Login
