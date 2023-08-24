import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { appContext } from '../../utils/Context'
const initialFormValues = {
  email: '',
  password: '',
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
  justify-content: center;
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

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(appContext)
  const [user, setUser] = useState(initialFormValues)
  const [error, setError] = useState(null)
  const token = window.localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    console.log(process.env.REACT_APP_BASE_URI)
    if (token) {
      navigate('/home')
    }
  }, [])
  const updateData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const checkIfEmpty = () => {
    return user?.email?.trim() !== '' && user?.password?.trim() !== ''
  }

  const reinitializeForm = () => {
    setUser(initialFormValues)
  }

  const checkAuth = (e) => {
    e.preventDefault()
    if (checkIfEmpty()) {
      window.localStorage.removeItem('token')
      axios
        .post(`${process.env.REACT_APP_BASE_URI}/auth/login`, { ...user })
        .then((response) => {
          window.localStorage.setItem('token', response.data.token)
          //On stocke alors le user connecté dans le contexte appContext
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
          setError(err.message || err)
          reinitializeForm()
        })
    } else {
      setError('Veuillez remplir tous les champs')
    }
  }

  return (
    !token && (
      <Container>
        <Title>BrokensBooks</Title>
        <Form action="" method="post">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Input
            type="text"
            onChange={(e) => updateData(e)}
            name="email"
            placeholder="Email"
          />
          <Input
            type="password"
            onChange={(e) => updateData(e)}
            name="password"
            placeholder="Password"
          />
          <p>
            J'ai n'ai pas de compte:{' '}
            <Link
              to="/signup"
              style={{
                color: 'rgb(255, 115, 0)',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              Créer un compte
            </Link>
          </p>
          <Button onClick={checkAuth}>Valider</Button>
        </Form>
      </Container>
    )
  )
}

export default Login
