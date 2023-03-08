import { createContext, useContext } from 'react'
import useLocalStorage from './hooks/useLocalStorage'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('session')
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)[0]
export const useSetUser = () => useContext(UserContext)[1]
