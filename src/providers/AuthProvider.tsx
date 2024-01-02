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
  const [userAccessToken, setUserAccessToken] = useState(accessToken.value())

  useEffect(() => {
    setUserAccessToken(userAccessToken)

    if (userAccessToken) {
      const { sub, username, fullName } = jwtDecode(userAccessToken) as {
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
  }, [userAccessToken])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
