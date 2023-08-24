import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const IMG = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 20px;
  border: 3px solid rgb(255, 115, 0);
`
const InformatonsCompte = ({ user }) => {
  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Informations du compte</h1>
        <h2>Prénom : {user?.prenom}</h2>
        <h2>Nom : {user?.nom}</h2>
        <h2>Email : {user?.email}</h2>
        <h2>Numéro de téléphone : {user?.phoneNumber}</h2>
      </div>
      <div>
        <IMG src={user?.photoUrl} alt="avatar" />
      </div>
    </Container>
  )
}
export default InformatonsCompte
