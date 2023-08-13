import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

import { useFetch } from '../../utils/Hooks/UseFetch'
import ErrorPage from '../ErrorPage'
import './annonces.style.css'
import { appContext } from '../../utils/Context'
import Loader from '../Loader'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-family: 'Segoe UI';
  ${(props) =>
    `color:${props.color};font-weight:${props.fontWeight};font-size:${props.fontSize}`}
`

const Annonces = () => {
  const { currentUser } = useContext(appContext)
  const {
    data: annonces,
    loading,
    error,
  } = useFetch('http://localhost:3000/annonces/')

  const deleteAnnonce = (id) => {
    axios
      .delete(`http://localhost:3000/annonces/deleteAnnonce/${id}`, {
        headers: {
          Authorization: window.localStorage.getItem('token'),
        },
      })
      .then((res) => {
        toast.success('Votre annonce a été supprimée!', {
          autoClose: 1000,
        })
      })
      .catch((err) => {
        toast.error('Impossible de supprimer!', {
          autoClose: 1000,
        })
      })
  }

  const annoncesListe = annonces?.map((annonce, i) => (
    <li key={i}>
      <div className="left_image">
        <img src="https://www.shbarcelona.fr/blog/fr/wp-content/uploads/2016/03/appartement-photo-810x540.jpg" />
      </div>
      <div className="right">
        <StyledLink
          fontWeight="400"
          fontSize="20px"
          to={`/annonce/${annonce?._id}`}
        >
          {annonce?.title}
        </StyledLink>

        <h3>{`${annonce?.price} $`}</h3>

        {currentUser?.email === annonce?.author && (
          <div className="update_edit_annonce">
            <StyledLink
              color="rgb(255, 115, 0)"
              fontWeight="bold"
              to={`/editAnnonce/${annonce?._id}`}
            >
              Modifier
            </StyledLink>
            <StyledLink
              color="rgb(255, 115, 0)"
              fontWeight="bold"
              onClick={() => deleteAnnonce(annonce._id)}
            >
              Supprimer
            </StyledLink>
          </div>
        )}
        <p className="date_publication">{`${moment(annonce.createdAt).format(
          'DD/MM/YYYY, HH:mm'
        )}`}</p>
      </div>
    </li>
  ))

  if (error) return <ErrorPage />

  return !loading ? (
    <div className="container">
      <ToastContainer />
      <ul>{annoncesListe}</ul>
    </div>
  ) : (
    <Loader />
  )
}

export default Annonces
