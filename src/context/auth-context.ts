import { createContext } from 'react'

export type AuthContextType = {
  user?: {
    id: string
    username: string
    fullName: string
  }
}

export const AuthContext = createContext<AuthContextType>({})
