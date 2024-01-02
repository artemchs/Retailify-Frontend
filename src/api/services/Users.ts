import { useQuery } from '@tanstack/react-query'
import client from '../client'

export default {
  useGetMe: () =>
    useQuery({
      queryKey: ['users/me'],
      queryFn: async () => {
        const { data } = await client.get<{
          username: string
          fullName: string
          profilePicture: string | null
        }>('/users/me')

        return data
      },
    }),
}
