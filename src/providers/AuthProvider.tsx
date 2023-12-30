import { AuthContext, AuthContextType } from '@/context/auth-context'
import { accessToken } from '@/utils/accessToken'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [auth, setAuth] = useState<AuthContextType>({})

  const at = accessToken.value()

  useEffect(() => {
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
  }, [at])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
