import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { appContext } from '../../utils/Context'
import { useFetch } from '../../utils/Hooks/UseFetch/'
import { useToggle } from '../../utils/Hooks/UseToggle'
import Header from '../Header'
import './home.style.css'
import Annonces from '../Annonces'
import ErrorPage from '../ErrorPage'
import AddAnnonce from '../AddAnnonce'
import Filters from '../Filters'
import axios from 'axios'
const Container = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ShowFilters = styled.button`
  color: rgb(255, 115, 0);
  height: 30px;
  padding: 0 10px;
  border: 1px solid rgb(255, 115, 0);
  border-radius: 0.8rem;
  align-self: flex-end;
  background-color: white;
`
const initialFilters = {
  type: '',
  priceMin: '',
  priceMax: '',
  surfaceMin: '',
  surfaceMax: '',
  nombrePieces: '',
}
const Home = () => {
  const { currentUser, setCurrentUser } = useContext(appContext)
  const { value: showAddAnnonce, toggleValue } = useToggle(false)
  const { value: showFilters, toggleValue: toggleFilters } = useToggle(false)
  const {
    data: annonces,
    loading,
    error,
  } = useFetch(`${process.env.REACT_APP_BASE_URI}/annonces`)
  const [filters, setFilters] = useState(initialFilters)
  const [annoncesListe, setAnnoncesListe] = useState([])
  const handleFiltersChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }
  const deleteFilters = () => {
    setFilters(initialFilters)
  }
  useEffect(() => {
    //On stocke l'id de l'utilisateur courant dans le header de la requête axios ,
    //pour qu'on puisse plus tard vérifier que le token appartient bien à l'utilisateur
    //on comparera l'id du token avec l'id du header

    setAnnoncesListe(annonces)
  }, [annonces])

  useEffect(() => {
    const filteredAnnonces = annonces?.filter((annonce) => {
      return (
        (filters.type === '' || annonce.type === filters.type) &&
        (filters.priceMin === '' || annonce.price >= filters.priceMin) &&
        (filters.priceMax === '' || annonce.price <= filters.priceMax) &&
        (filters.surfaceMin === '' || annonce.surface >= filters.surfaceMin) &&
        (filters.surfaceMax === '' ||
          (annonce.surface <= filters.surfaceMax &&
            (filters.nombrePieces === '' ||
              annonce.nombrePieces >= filters.nombrePieces)))
      )
    })
    setAnnoncesListe(filteredAnnonces)
  }, [filters, annonces])

  if (error) return <ErrorPage />

  return (
    currentUser && (
      <Container>
        <Header isAnnoncesVisible={{ toggleValue, showAddAnnonce }} />
        {showAddAnnonce ? (
          <AddAnnonce isAnnoncesVisible={{ toggleValue, showAddAnnonce }} />
        ) : (
          <>
            <ShowFilters onClick={toggleFilters}>
              {showFilters ? `Cacher les filtres` : `Filtres`}
            </ShowFilters>

            <Filters
              handleFiltersChange={handleFiltersChange}
              showFilters={showFilters}
              deleteFilters={deleteFilters}
              filters={filters}
            />

            <Annonces
              annonces={annoncesListe}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              loading={loading}
            />
          </>
        )}
      </Container>
    )
  )
}

export default Home
