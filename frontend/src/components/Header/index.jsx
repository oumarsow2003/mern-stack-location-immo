import React, { useContext } from 'react'
import styled from 'styled-components'
import userLogo from '../../assets/user.png'
import './header.style.css'
import LinkButton from '../LinkButton'
import { useState } from 'react'
import { logout } from '../../utils/helpers/Logout'
import { appContext } from '../../utils/Context'
const StyledHeader = styled.header`
  font-family: 'Segoe UI';
`
const Container = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
  position: relative;
`
const UserLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgb(255, 115, 0);
`
const DropdownMenu = styled.div`
  position: absolute;
  top: 103px;
  right: 50%;
  left: 50%;
  width: 150px;
  height: 100px;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 0.4rem;
  box-shadow: rgba(26, 26, 26, 0.08) 0px -1px 4px 0px,
    rgba(26, 26, 26, 0.12) 0px 4px 8px;
`
const DropdownItem = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgb(255, 115, 0);
    color: white;
  }
  border-radius: 0.4rem;
`
const Header = ({ isAnnoncesVisible }) => {
  const { currentUser } = useContext(appContext)
  const [showDropdown, setShowDropdown] = useState(false)
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
        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          style={{
            position: 'relative',
          }}
        >
          <UserLogo src={currentUser?.photoUrl} alt="user logo" />
          {showDropdown && (
            <DropdownMenu>
              <DropdownItem>
                <LinkButton
                  to={`/profil/${currentUser?._id}`}
                  value="Mon profil"
                  color="black"
                />
              </DropdownItem>
              <DropdownItem onClick={logout}>Déconnexion</DropdownItem>
            </DropdownMenu>
          )}
        </div>
      </Container>
    </StyledHeader>
  )
}

export default Header
