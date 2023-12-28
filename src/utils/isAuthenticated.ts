import axiosClient from '@/lib/axios-client'
import { accessToken } from './accessToken'

export async function isAuthenticated() {
  const at = accessToken.value()

  if (at) return true

  try {
    const { data } = await axiosClient.post<{ accessToken: string }>(
      '/auth/refresh-token'
    )

    const newAccessToken = data.accessToken
    if (newAccessToken) {
      accessToken.update(newAccessToken)
      return true
    }

    return false
  } catch (e) {
    return false
  }
}
