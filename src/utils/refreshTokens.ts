import axiosClient from '@/lib/axios-client'

export async function refreshTokens() {
  try {
    const { data } = await axiosClient.post<{ accessToken: string }>(
      '/auth/refresh-token'
    )
    return data.accessToken
  } catch (e) {
    return null
  }
}
