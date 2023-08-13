import React from 'react'
import styled from 'styled-components'
import './header.style.css'

import LinkButton from '../LinkButton'
const StyledHeader = styled.header`
  font-family: 'Segoe UI';
`
const Container = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`
const Header = ({ isAnnoncesVisible }) => {
  const { toggleValue, showAddAnnonce } = isAnnoncesVisible || {}
  return (
    <StyledHeader>
      <Container>
        <h1 className="site_title">
          <LinkButton
            to="/home"
            value="brokensbooks"
            color="rgb(255, 115, 0)"
          />
        </h1>
        {isAnnoncesVisible && (
          <h1 className="add_annonce" onClick={toggleValue}>
            {showAddAnnonce ? 'Voir les annonces' : 'Publier une annonce'}
          </h1>
        )}
      </Container>
    </StyledHeader>
  )
}

export default Header
