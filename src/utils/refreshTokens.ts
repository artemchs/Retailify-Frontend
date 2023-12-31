import client from "@/api/client"

export async function refreshTokens() {
  try {
    const { data } = await client.post<{ accessToken: string }>(
      '/auth/refresh-token'
    )
    return data.accessToken
  } catch (e) {
    return null
  }
}
