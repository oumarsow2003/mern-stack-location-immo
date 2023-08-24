import { useContext, useState } from 'react'
import { appContext } from '../../utils/Context'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../utils/Hooks/UseFetch'
import Annonces from '../Annonces'
import InformationsCompte from '../InformationsCompte'
import styled from 'styled-components'
import Loader from '../Loader'
import Header from '../Header'
import ErrorPage from '../ErrorPage'

const Container = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: flex;
`
const Content = styled.div`
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgb(255, 105, 0);
  padding: 0px 30px;
`
const Left = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`

const Right = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
`

const MenuItem = styled.h2`
  ${(props) =>
    props.selected && ' color : rgb(255, 115, 0) ; font-weight : bold'};
`

const Profil = () => {
  const { currentUser, setCurrentUser } = useContext(appContext)
  const { id } = useParams()
  const [display, setDisplay] = useState('profil')
  const {
    data: user,
    loading: loadingUser,
    error: errorUser,
  } = useFetch(`${process.env.REACT_APP_BASE_URI}/auth/user/${id}`)
  const {
    data: annonces,
    loading: loadingAnnonces,
    error: errorAnnonces,
  } = useFetch(`${process.env.REACT_APP_BASE_URI}/auth/getUserAnnonces/${id}`)
  const {
    data: favoris,
    loading: loadingFavoris,
    error: errorFavoris,
  } = useFetch(`${process.env.REACT_APP_BASE_URI}/auth/getUserFavoris/${id}`)

  if (loadingAnnonces || loadingUser || loadingFavoris) return <Loader />
  if (errorAnnonces || errorUser || errorFavoris) return <ErrorPage />
  return (
    <div>
      <Header />
      <Container>
        <Left>
          <MenuItem
            onClick={() => setDisplay('profil')}
            selected={display === 'profil'}
          >
            Profil
          </MenuItem>
          <MenuItem
            onClick={() => setDisplay('annonces')}
            selected={display === 'annonces'}
          >
            Annonces
          </MenuItem>
          {currentUser?._id === user?._id && (
            <MenuItem
              onClick={() => setDisplay('favoris')}
              selected={display === 'favoris'}
            >
              Favoris
            </MenuItem>
          )}
        </Left>
        <Right>
          <Content>
            {display === 'profil' && <InformationsCompte user={user} />}
            {display === 'annonces' && (
              <Annonces
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                annonces={annonces}
              />
            )}
            {currentUser?._id === user?._id && display === 'favoris' && (
              <Annonces
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                annonces={favoris}
              />
            )}
          </Content>
        </Right>
      </Container>
    </div>
  )
}

export default Profil
