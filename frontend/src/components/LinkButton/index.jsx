import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.2em;
  display: flex;
  ${(props) =>
    `background-color : ${props.background}; justify-content:${props.justify} ; color:${props.color}`};
`
const LinkButton = ({ to, value, background, justify, color }) => {
  return (
    <StyledLink to={to} background={background} justify={justify} color={color}>
      {value}
    </StyledLink>
  )
}

export default LinkButton
