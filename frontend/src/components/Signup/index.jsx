import axios from 'axios'
import React, { useState, useContext } from 'react'
import { appContext } from '../../utils/Context'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LinkButton from '../LinkButton'

const initialFormValues = {
  prenom: '',
  nom: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 25px;
`

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: rgb(255, 115, 0);
  color: white;
  font-weight: bold;
  width: 320px;
  height: 45px;
`
const Title = styled.h1`
  text-align: center;
`

const Signup = () => {
  const { setCurrentUser } = useContext(appContext)
  const [user, setUser] = useState(initialFormValues)
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const updateData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // Add a new function to handle image selection
  const handleImageChange = (e) => {
    setImages([...e.target.files])
  }

  const checkIfEmpty = () => {
    return (
      user?.prenom?.trim() !== '' &&
      user?.nom?.trim() !== '' &&
      user?.email?.trim() !== '' &&
      user?.phoneNumber?.trim() !== '' &&
      user?.password?.trim() !== '' &&
      user?.confirmPassword?.trim() !== ''
    )
  }

  const reinitializeForm = () => {
    setUser(initialFormValues)
  }

  const checkAuth = (e) => {
    e.preventDefault()
    if (checkIfEmpty()) {
      if (user.password === user.confirmPassword) {
        const { confirmPassword, ...userWithoutConfirmPassword } = user
        axios
          .post(
            `${process.env.REACT_APP_BASE_URI}/auth/signup`,
            {
              ...userWithoutConfirmPassword,
              images: images[0],
            },
            {
              headers: {
                'Content-Type': 'multipart/form-data', // set the Content-Type header to multipart/form-data
              },
            }
          )
          .then((response) => {
            window.localStorage.setItem('token', response.data.token)
            axios
              .get(`${process.env.REACT_APP_BASE_URI}/auth/currentUser`, {
                headers: {
                  Authorization: response.data.token,
                },
              })
              .then((response) => {
                setCurrentUser(response.data)
              })
              .catch((err) => {
                console.log(err)
              })
            navigate('/home')
          })
          .catch((err) => {
            setError(err.response.data.message)
          })
      } else {
        setError('Les mots de passe ne correspondent pas')
      }
    } else {
      setError('Veuillez remplir tous les champs')
    }
  }

  return (
    <Container>
      <Title>Signup Page</Title>
      <Form action="" method="post" encType="multipart/form-data">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Input
          type="text"
          onChange={(e) => updateData(e)}
          name="prenom"
          placeholder="First Name"
        />
        <Input
          type="text"
          onChange={(e) => updateData(e)}
          name="nom"
          placeholder="Last Name"
        />
        <Input
          type="text"
          onChange={(e) => updateData(e)}
          name="email"
          placeholder="Email"
        />
        <Input
          type="text"
          onChange={(e) => updateData(e)}
          name="phoneNumber"
          placeholder="Phone Number"
        />
        <Input
          type="password"
          onChange={(e) => updateData(e)}
          name="password"
          placeholder="Password"
        />
        <Input
          type="password"
          onChange={(e) => updateData(e)}
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <input
          type="file"
          onChange={(e) => handleImageChange(e)}
          name="images"
        />
        <p>
          J'ai déjà un compte :{' '}
          <Link
            to="/"
            style={{
              color: 'rgb(255, 115, 0)',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Connexion
          </Link>
        </p>
        <Button onClick={checkAuth}>Valider</Button>
      </Form>
    </Container>
  )
}

export default Signup
