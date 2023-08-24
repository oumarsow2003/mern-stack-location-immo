import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import ErrorPage from '../ErrorPage'
import './annonces.style.css'
import Loader from '../Loader'
import modifier from '../../assets/modifier.png'
import supprimer from '../../assets/supprimer.png'
import favoris from '../../assets/favori.png'
import etoile from '../../assets/etoile.png'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-family: 'Segoe UI';
  ${(props) =>
    `
    color:${props.color};
    font-weight:${props.fontWeight};
    font-size:${props.fontSize}
    `}
`

const Annonces = ({
  annonces,
  loading,
  error,
  currentUser,
  setCurrentUser,
}) => {
  const deleteAnnonce = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URI}/annonces/deleteAnnonce/${id}`,
        {
          headers: {
            Authorization: window.localStorage.getItem('token'),
          },
        }
      )
      toast.success('Votre annonce a été supprimée!', {
        autoClose: 1000,
      })
    } catch (err) {
      toast.error('Impossible de supprimer!', {
        autoClose: 1000,
      })
    }
  }
  const addToFavoris = async (annonce) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URI}/auth/addToFavoris/`,
        {
          ...annonce,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem('token'),
          },
        }
      )
      setCurrentUser((prevUser) => ({
        ...prevUser,
        favoris: [...prevUser?.favoris, annonce?._id],
      }))
      toast.success('Votre annonce a été ajoutée aux favoris!', {
        autoClose: 1000,
      })
    } catch (err) {
      toast.error("Impossible d'ajouter aux favoris!", {
        autoClose: 1000,
      })
    }
  }
  const deleteFavori = async (annonce) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URI}/auth/deleteFavori/`,
        {
          annonceId: annonce?._id,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem('token'),
          },
        }
      )
      setCurrentUser((prevUser) => ({
        ...prevUser,
        favoris: prevUser.favoris.filter((id) => id !== annonce._id),
      }))
      toast.success('Votre annonce a été supprimée des favoris!', {
        autoClose: 1000,
      })
    } catch (err) {
      toast.error('Impossible de supprimer des favoris!', {
        autoClose: 1000,
      })
    }
  }

  const handleFavoriClick = (annonce) => {
    if (currentUser?.favoris?.includes(annonce?._id)) {
      deleteFavori(annonce)
    } else {
      addToFavoris(annonce)
    }
  }

  const annoncesListe = annonces?.map((annonce) => (
    <li key={annonce._id}>
      <div className="left_image">
        <img alt="image_annonce" src={annonce?.imageUrl} />
      </div>
      <div className="right">
        <StyledLink
          fontWeight="400"
          fontSize="20px"
          to={`/annonce/${annonce._id}`}
        >
          {annonce.title}
        </StyledLink>

        <h3>{`${annonce.price} $`}</h3>
        <div className="update_edit_annonce">
          {currentUser?.email === annonce.author && (
            <>
              <StyledLink
                color="rgb(255, 115, 0)"
                fontWeight="bold"
                to={`/editAnnonce/${annonce._id}`}
              >
                <img width="30px" src={modifier} alt="modifier" />
              </StyledLink>
              <StyledLink
                color="rgb(255, 115, 0)"
                fontWeight="bold"
                onClick={() => deleteAnnonce(annonce._id)}
              >
                <img width="30px" src={supprimer} alt="supprimer" />
              </StyledLink>
            </>
          )}

          <StyledLink
            color="rgb(255, 115, 0)"
            fontWeight="bold"
            onClick={() => handleFavoriClick(annonce)}
          >
            <img
              width="30px"
              src={
                currentUser?.favoris?.includes(annonce._id) ? favoris : etoile
              }
              alt={
                currentUser?.favoris?.includes(annonce._id)
                  ? 'favori'
                  : 'etoile'
              }
            />
          </StyledLink>
        </div>

        <p className="date_publication">{`${moment(annonce?.createdAt).format(
          'DD/MM/YYYY, HH:mm'
        )}`}</p>
      </div>
    </li>
  ))

  if (error) return <ErrorPage />

  return !loading ? (
    <div className="container">
      <ToastContainer />
      {annoncesListe?.length === 0 && (
        <p className="no_annonce">Aucune annonce à afficher</p>
      )}
      <ul>{annoncesListe}</ul>
    </div>
  ) : (
    <Loader />
  )
}

export default Annonces
