import { createContext, useState } from 'react'

export const appContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <appContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </appContext.Provider>
  )
}
