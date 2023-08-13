import { useEffect, useState } from 'react'
import axios from 'axios'
export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = () => {
      setLoading(true)
      axios
        .get(url, {
          headers: {
            Authorization: window.localStorage.getItem('token'),
          },
        })
        .then((response) => {
          setData(response.data)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          setError(err)
        })
    }
    fetchData()
  }, [url])
  return { data, error, loading }
}
