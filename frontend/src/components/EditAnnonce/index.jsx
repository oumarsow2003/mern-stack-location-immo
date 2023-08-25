import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

import { useFetch } from '../../utils/Hooks/UseFetch'
import ErrorPage from '../ErrorPage'
import LinkButton from '../LinkButton'
import Header from '../Header'
import AnnonceForm from '../AnnonceForm'

const Title = styled.h1`
  display: flex;
  justify-content: center;
`

const initialFormValues = {
  title: '',
  description: '',
  price: '',
  surface: 0,
  type: '',
  nombrePieces: 0,
}

const EditAnnonce = () => {
  const { idAnnonce } = useParams()
  // Récupération de l'annonce
  const { data: annonce, error } = useFetch(
    `${process.env.REACT_APP_BASE_URI}/annonces/${idAnnonce}`
  )
  const [updatedAnnonce, setUpdatedAnnonce] = useState(annonce)

  useEffect(() => {
    setUpdatedAnnonce(annonce)
  }, [annonce])

  const handleChange = (e) => {
    annonce &&
      setUpdatedAnnonce({
        ...updatedAnnonce,
        [e.target.name]: e.target.value,
      })
  }

  const checkIfEmpty = () => {
    return (
      updatedAnnonce?.title?.trim() !== '' &&
      updatedAnnonce?.description?.trim() !== '' &&
      updatedAnnonce?.price?.trim() !== '' &&
      updatedAnnonce?.surface?.trim() !== '' &&
      updatedAnnonce?.type?.trim() !== '' &&
      updatedAnnonce?.type?.trim() !== '' &&
      updatedAnnonce?.nombrePieces?.trim() !== ''
    )
  }

  const reinitializeForm = () => {
    setUpdatedAnnonce(initialFormValues)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (checkIfEmpty()) {
      axios
        .put(
          `${process.env.BASE_URI}/annonces/${idAnnonce}`,
          { ...updatedAnnonce },
          {
            headers: {
              Authorization: window.localStorage.getItem('token'),
            },
          }
        )
        .then((annonce) => {
          toast.success('Votre annonce a été modifiée !', {
            autoClose: 2000,
          })
          reinitializeForm()
        })
        .catch((error) =>
          toast.error('Impossible de modifier', {
            autoClose: 2000,
          })
        )
    }
  }

  if (error) return <ErrorPage />

  return (
    <>
      <Header />
      <Title>Mettez à jour votre annonce</Title>
      <LinkButton
        to="/home"
        value="Accueil"
        background="rgb(255, 115, 0)"
        justify="center"
      />
      <ToastContainer position="top-center" />
      {updatedAnnonce && (
        <AnnonceForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          annonce={updatedAnnonce}
        />
      )}
    </>
  )
}

export default EditAnnonce
