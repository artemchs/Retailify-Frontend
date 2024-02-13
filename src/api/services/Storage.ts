import { useQuery } from '@tanstack/react-query'
import client from '../client'

export default {
  useGetUrl: ({ key }: { key: string }) =>
    useQuery({
      queryKey: ['product-media', { key }],
      queryFn: async () => {
        const { data } = await client.get(`/storage?key=${key}`)
        return data as string
      },
    }),
}
