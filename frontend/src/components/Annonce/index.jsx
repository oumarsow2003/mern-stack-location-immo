import React, { useState, useEffect, useContext } from 'react'
import { appContext } from '../../utils/Context'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import './annonce.style.css'
import Header from '../Header'
import ErrorPage from '../ErrorPage'
import Loader from '../Loader'
import Criteres from '../Criteres'

const Container = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
`
const Left = styled.div`
  width: 65%;
`
const Right = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 33%;
  height: 250px;
  box-shadow: rgba(26, 26, 26, 0.08) 0px -1px 4px 0px,
    rgba(26, 26, 26, 0.12) 0px 4px 8px;
  border-radius: 0.4rem;
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;
`
const Button = styled.button`
  background-color: rgb(255, 115, 0);
  height: 40px;
  width: 250px;
  border: none;
  color: white;
  border-radius: 0.8rem;
  margin: 20px auto;
`
const Author = styled.h3``
const Title = styled.h2``
const Description = styled.p``
const SectionTitle = styled.h2``

const Annonce = () => {
  const { idAnnonce } = useParams()
  const [annonceData, setAnnonceData] = useState(null)
  const [annonceError, setAnnonceError] = useState(false)
  const [annonceLoading, setAnnonceLoading] = useState(true)
  const [authorData, setAuthorData] = useState(null)
  const [authorError, setAuthorError] = useState(false)
  const [authorLoading, setAuthorLoading] = useState(true)
  const [authorAnnoncesListData, setAuthorAnnoncesListData] = useState(null)
  const [authorAnnoncesListError, setAuthorAnnoncesListError] = useState(false)
  const [authorAnnoncesListLoading, setAuthorAnnoncesListLoading] =
    useState(true)
  const { currentUser } = useContext(appContext)
  useEffect(() => {
    const fetchAnnonceData = async () => {
      try {
        const annonceResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/annonces/${idAnnonce}`,
          {
            headers: {
              Authorization: window.localStorage.getItem('token'),
            },
          }
        )
        setAnnonceData(annonceResponse.data)
        setAnnonceLoading(false)

        const authorResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/auth/user/${annonceResponse?.data.authorId}`,
          {
            headers: {
              Authorization: window.localStorage.getItem('token'),
            },
          }
        )
        setAuthorData(authorResponse.data)
        setAuthorLoading(false)

        const authorAnnoncesListResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/auth/getUserAnnonces/${annonceResponse?.data.authorId}`,
          {
            headers: {
              Authorization: window.localStorage.getItem('token'),
            },
          }
        )
        setAuthorAnnoncesListData(authorAnnoncesListResponse.data)
        setAuthorAnnoncesListLoading(false)
      } catch (error) {
        if (!annonceData) setAnnonceError(true)
        if (!authorData) setAuthorError(true)
        if (!authorAnnoncesListData) setAuthorAnnoncesListError(true)
      }
    }
    fetchAnnonceData()
  }, [])

  if (annonceError || authorError || authorAnnoncesListError)
    return <ErrorPage />

  if (annonceLoading || authorLoading || authorAnnoncesListLoading)
    return <Loader />

  return (
    <div className="body">
      <Header currentUser={currentUser} />
      <Container>
        <Left>
          <div className="main_image">
            <img alt="image_logement" src={annonceData?.imageUrl} />
          </div>
          <Title>{annonceData?.title}</Title>
          <h3>{annonceData?.price} $</h3>
          <SectionTitle>Description</SectionTitle>
          <Description>{annonceData?.description}</Description>
          <Criteres annonce={annonceData} />
        </Left>
        <Right>
          <Author>{authorData.email}</Author>
          <p>
            {authorAnnoncesListData?.length > 0 &&
              `${authorAnnoncesListData?.length} annonces`}
          </p>
          <Button>Contacter</Button>
        </Right>
      </Container>
    </div>
  )
}

export default Annonce
