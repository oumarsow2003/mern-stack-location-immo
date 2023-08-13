import React, { useContext, useEffect } from 'react'
import { appContext } from '../../utils/Context'
import { useFetch } from '../../utils/Hooks/UseFetch/'
import { useToggle } from '../../utils/Hooks/UseToggle'
import Header from '../Header'
import './home.style.css'
import Annonces from '../Annonces'
import ErrorPage from '../ErrorPage'
import AddAnnonce from '../AddAnnonce'
const Home = () => {
  const { setCurrentUser } = useContext(appContext)
  const { value: showAddAnnonce, toggleValue } = useToggle(false)

  const { data: user, error } = useFetch(
    `http://localhost:3000/auth/currentUser`
  )

  useEffect(() => {
    setCurrentUser(user)
  }, [user, setCurrentUser])
  if (error) return <ErrorPage />
  return (
    user && (
      <div>
        <Header isAnnoncesVisible={{ toggleValue, showAddAnnonce }} />
        {showAddAnnonce ? (
          <AddAnnonce isAnnoncesVisible={{ toggleValue, showAddAnnonce }} />
        ) : (
          <Annonces />
        )}
      </div>
    )
  )
}

export default Home
