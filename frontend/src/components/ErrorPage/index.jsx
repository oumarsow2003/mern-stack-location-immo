import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { appContext } from '../../utils/Context'
const ErrorPage = () => {
  const { currentUser } = useContext(appContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])
  return <div>ErrorPage</div>
}

export default ErrorPage
