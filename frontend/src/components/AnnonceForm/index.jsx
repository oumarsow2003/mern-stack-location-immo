import React from 'react'
import styled from 'styled-components'
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin: 20px auto 0 auto;
  gap: 10px;
`
const StyledInput = styled.input`
  height: 40px;
  border-radius: 0.4rem;
  border: 0.5px solid gray;
`
const StyledTextarea = styled.textarea`
  height: 200px;
  border-radius: 0.4rem;
  border: 0.5px solid gray;
`
const StyledLabel = styled.label`
  font-size: 1.4em;
`
const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  background-color: inherit;
  border-radius: 0.4rem;
  border: 0.5px solid gray;
`
const StyledButton = styled.button`
  background-color: rgb(255, 115, 0);
  color: white;
  border: none;
  height: 40px;
  border-radius: 0.4rem;
  font-size: 1.4em;
`
const AnnonceForm = ({ handleChange, handleSubmit, annonce }) => {
  return (
    <StyledForm>
      <StyledLabel htmlFor="titleAnnonce">
        Entre le titre de votre annonce
      </StyledLabel>
      <StyledInput
        onChange={(e) => handleChange(e)}
        name="title"
        type="text"
        id="titleAnnonce"
        value={annonce?.title}
      />
      <StyledLabel htmlFor="prixAnnonce">
        Entrez le prix de votre annonce
      </StyledLabel>
      <StyledInput
        onChange={(e) => {
          handleChange(e)
        }}
        type="number"
        name="price"
        value={annonce?.price}
      />
      <StyledLabel htmlFor="descriptionAnnonce">
        Entrez une description de votre annonce
      </StyledLabel>
      <StyledTextarea
        onChange={(e) => handleChange(e)}
        type="text"
        name="description"
        value={annonce?.description}
      />
      <StyledLabel htmlFor="prixAnnonce">
        Entrez la surface de votre bien
      </StyledLabel>
      <StyledInput
        onChange={(e) => {
          handleChange(e)
        }}
        type="number"
        name="surface"
        value={annonce?.surface}
      />
      <StyledLabel htmlFor="prixAnnonce">
        Entrez le nombre de pièces de votre bien
      </StyledLabel>
      <StyledInput
        onChange={(e) => {
          handleChange(e)
        }}
        type="number"
        name="nombrePieces"
        value={annonce?.nombrePieces}
      />
      <StyledLabel htmlFor="prixAnnonce">
        Choisissez le type de votre bien
      </StyledLabel>
      <StyledSelect
        onChange={(e) => {
          handleChange(e)
        }}
        name="type"
        value={annonce?.type}
      >
        <option value="Appartement">Appartement</option>
        <option value="Maison">Maison</option>
      </StyledSelect>
      <StyledButton
        onClick={(e) => {
          handleSubmit(e)
        }}
      >
        Publier l'annonce
      </StyledButton>
    </StyledForm>
  )
}

export default AnnonceForm
