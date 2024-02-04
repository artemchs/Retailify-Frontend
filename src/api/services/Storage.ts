import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'

export default {
  useUpload: () =>
    useMutation({
      mutationKey: ['upload-media'],
      mutationFn: async ({ file, key }: { file: File; key: string }) => {
        const { data } = await client.post(`/storage?key=${key}`)
        await fetch(data, {
          body: file,
          method: 'PUT',
        })
      },
    }),

  useGetUrl: ({ key }: { key: string }) =>
    useQuery({
      queryKey: ['product-media', { key }],
      queryFn: async () => {
        const { data } = await client.get(`/storage?key=${key}`)
        return data as string
      },
    }),
}
