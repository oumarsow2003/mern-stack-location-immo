import axios from 'axios'

export const logout = () => {
  const token = window.localStorage.getItem('token')
  if (token) {
    axios
      .post(
        'http://localhost:3000/token/addToken',
        { token: token },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        window.localStorage.removeItem('token')
        window.location.href = '/'
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
