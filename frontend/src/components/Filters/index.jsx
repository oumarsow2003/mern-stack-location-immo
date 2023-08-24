import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1100px;
  margin: 20px auto 0 auto;
  justify-content: center;
  transition: all 0.5s ease-in-out;
`
const Input = styled.input`
  height: 40px;
  border-radius: 0.4rem;
  border: 0.5px solid gray;
  width: 250px;
`
const Filter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin: 0 20px;
`
const Select = styled.select`
  width: 250px;
  height: 40px;
  background-color: inherit;
  border-radius: 0.4rem;
  border: 0.5px solid gray;
`
const Label = styled.label`
  font-size: 1em;
  color: gray;
`
const Filters = ({
  handleFiltersChange,
  showFilters,
  deleteFilters,
  filters,
}) => {
  return (
    showFilters && (
      <>
        <p onClick={deleteFilters}>Effacer les filtres</p>
        <Container>
          <Filter>
            <Label htmlFor="price">Prix min</Label>
            <Input
              type="number"
              id="priceMin"
              name="priceMin"
              value={filters?.priceMin}
              onChange={(e) => handleFiltersChange(e)}
            />
          </Filter>
          <Filter>
            <Label htmlFor="price">Prix max</Label>
            <Input
              type="number"
              id="priceMax"
              name="priceMax"
              value={filters?.priceMax}
              onChange={(e) => handleFiltersChange(e)}
            />
          </Filter>
          <Filter>
            <Label htmlFor="type">Type de logement</Label>
            <Select
              name="type"
              id="type"
              value={filters?.type}
              onChange={(e) => handleFiltersChange(e)}
            >
              <option value="">--Choisissez un type--</option>
              <option value="Appartement">Appartement</option>
              <option value="Maison">Maison</option>
            </Select>
          </Filter>

          <Filter>
            <Label htmlFor="rooms">Nombre de pièces</Label>
            <Input
              type="number"
              id="rooms"
              name="nombrePieces"
              value={filters?.nombrePieces}
              onChange={(e) => handleFiltersChange(e)}
            />
          </Filter>
          <Filter>
            <Label htmlFor="price">Surface min</Label>
            <Input
              type="number"
              id="surfaceMin"
              name="surfaceMin"
              value={filters?.surfaceMin}
              onChange={(e) => handleFiltersChange(e)}
            />
          </Filter>
          <Filter>
            <Label htmlFor="price">Surface max</Label>
            <Input
              type="number"
              id="surfaceMax"
              name="surfaceMax"
              value={filters?.surfaceMax}
              onChange={(e) => handleFiltersChange(e)}
            />
          </Filter>
        </Container>
      </>
    )
  )
}

export default Filters
