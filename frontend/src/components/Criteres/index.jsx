import React from 'react'
import styled from 'styled-components'
const Critere = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const CriteresListe = styled.div`
  display: flex;
  gap: 80px;
`
const Title = styled.h2`
  color: gray;
  font-size: 1em;
  line-height: 10px;
`
const CritereValue = styled.p`
  font-weight: 400;
`
const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 1.2em;
  color: #26474e;
`
const Criteres = ({ annonce }) => {
  return (
    <>
      <SectionTitle>Critères</SectionTitle>
      <CriteresListe>
        <Critere>
          <Title>Type de bien</Title>
          <CritereValue>{annonce?.type}</CritereValue>
        </Critere>
        <Critere>
          <Title>Surface</Title>
          <CritereValue>{annonce?.surface}</CritereValue>
        </Critere>
        <Critere>
          <Title>Nombre de pièces</Title>
          <CritereValue>{annonce?.nombrePieces}</CritereValue>
        </Critere>
      </CriteresListe>
    </>
  )
}

export default Criteres
