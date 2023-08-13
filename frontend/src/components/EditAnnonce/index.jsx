import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../utils/Hooks/UseFetch'
import { useState } from 'react'
import AnnonceForm from '../AnnonceForm'
import axios from 'axios'
import ErrorPage from '../ErrorPage'
import LinkButton from '../LinkButton'
import { toast, ToastContainer } from 'react-toastify'
import Header from '../Header'
const Title = styled.h1`
  display: flex;
  justify-content: center;
`
const initialFormValues = {
  title: '',
  description: '',
  price: '',
  surface: 0,
  type: 'Appartement',
  nombrePieces: 0,
}
const EditAnnonce = () => {
  const { idAnnonce } = useParams()
  //Récupération de l'annonce dont l'id est passé en paramètre
  const { data: annonce, error } = useFetch(
    `http://localhost:3000/annonces/${idAnnonce}`
  )

  const [updatedAnnonce, setUpdatedAnnonce] = useState(annonce)

  useEffect(() => {
    setUpdatedAnnonce(annonce)
  }, [annonce])

  const handleChange = (e) => {
    annonce &&
      setUpdatedAnnonce({ ...updatedAnnonce, [e.target.name]: e.target.value })
  }
  //Fonction  qui vérifie que tous les champs ont bien été saisis
  const checkIfEmpty = () => {
    return (
      updatedAnnonce?.title?.trim() !== '' &&
      updatedAnnonce?.description?.trim() !== '' &&
      updatedAnnonce?.price?.trim() !== ''
    )
  }
  const reinitializeForm = () => {
    setUpdatedAnnonce(initialFormValues)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const postAnnonce = () => {
      axios
        .put(
          `http://localhost:3000/annonces/${idAnnonce}`,
          { ...updatedAnnonce },
          {
            headers: {
              Authorization: window.localStorage.getItem('token'),
            },
          }
        )
        .then((annonce) => {
          // Notification du succès de la publication de l'annonce
          toast.success('Votre annonce a été modifiée !', {
            autoClose: 2000, // Durée en millisecondes avant de fermer la notification
          })
          reinitializeForm()
        })
        .catch((error) =>
          toast.error('Impossible de modifier', {
            autoClose: 2000,
          })
        )
    }
    checkIfEmpty && postAnnonce()
  }
  error && <ErrorPage />
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
