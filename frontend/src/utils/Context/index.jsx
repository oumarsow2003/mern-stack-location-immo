import { createContext, useEffect, useState } from 'react'
import { useFetch } from '../Hooks/UseFetch'
export const appContext = createContext()
export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const { data: user } = useFetch(
    `${process.env.REACT_APP_BASE_URI}/auth/currentUser`
  )
  useEffect(() => {
    setCurrentUser(user)
  }, [user])
  useEffect(() => {
    //Déconnexion automatique de toutes les sessions si le token est supprimé
    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        window.location.href = '/'
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
  return (
    <appContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </appContext.Provider>
  )
}
