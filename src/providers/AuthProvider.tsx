import { AuthContext, AuthContextType } from '@/context/auth-context'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { accessToken } from '@/utils/accessToken'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [auth, setAuth] = useState<AuthContextType>({})
  const at = accessToken.value()

  useEffect(() => {
    if (at) {
      const { sub, username, fullName } = jwtDecode(at) as {
        sub: string
        username: string
        fullName: string
      }
      setAuth({
        user: {
          id: sub,
          username,
          fullName,
        },
      })
    }
  }, [at])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
