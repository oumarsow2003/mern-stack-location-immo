import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { appContext } from '../../utils/Context'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './addAnnonce.style.css'
import AnnonceForm from '../AnnonceForm'

const FormError = styled.p`
  color: red;
  font-weight: bold;
  font-size: 1.2em;
`
const initialFormValues = {
  title: '',
  description: '',
  price: '',
  surface: 0,
  type: '',
  nombrePieces: 0,
  images: [],
}
const AddAnnonce = () => {
  const [annonce, setAnnonce] = useState(initialFormValues)
  const { currentUser } = useContext(appContext)
  const [formError, setFormError] = useState(null)

  // Add a new state variable to keep track of the selected images
  const [images, setImages] = useState([])

  // Add a new function to handle image selection
  const handleImageChange = (e) => {
    setImages([...e.target.files])
  }

  const handleChange = (e) => {
    setAnnonce({ ...annonce, [e.target.name]: e.target.value })
  }
  //Fonction qui vérifie que tous les champs ont bien été saisis
  const checkIfEmpty = () => {
    return (
      annonce?.title?.trim() !== '' &&
      annonce?.description?.trim() !== '' &&
      annonce?.price?.trim() !== '' &&
      annonce?.surface?.trim() !== '' &&
      annonce?.type?.trim() !== ''
    )
  }

  const reinitializeForm = () => {
    setAnnonce(initialFormValues)
    setImages([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const postAnnonce = () => {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URI}/annonces/`,
          {
            ...annonce,
            author: currentUser?.email,
            country: 'France',
            images: images[0],
          },
          {
            headers: {
              Authorization: window.localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((annonce) => {
          //Notification du succès de la publication de l'annonce
          toast.success('Votre annonce a été publiée !', {
            autoClose: 3000,
          })
          reinitializeForm()
        })
        .catch((error) => console.log(error))
    }
    //On vérifie que tous les champs ont bien été saisis avant de poster la nouvelle annonce
    checkIfEmpty()
      ? postAnnonce()
      : setFormError('Tous les champs doivent etre remplis !')
  }
  return (
    <>
      <ToastContainer position="top-center" />
      {formError && <FormError>{formError}</FormError>}
      <AnnonceForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        annonce={annonce}
      />
    </>
  )
}

export default AddAnnonce
