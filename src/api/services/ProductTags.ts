import { ProductTag } from '@/types/entities/ProductTag'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { CreateProductTagFormSchema } from '@/features/product-tags/types/create-product-tag-form-schema'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { EditProductTagFormSchema } from '@/features/product-tags/types/edit-product-tag-form-schema'

export type ProductTagsFindAll = {
  items: ProductTag[]
  nextCursor?: string
}

export default {
  useCreate: ({
    setErrorMessage,
    onSuccess,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
  }) =>
    useMutation({
      mutationKey: ['create-product-tag'],
      mutationFn: async ({ body }: { body: CreateProductTagFormSchema }) => {
        return await client.post('/product-tags', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['product-tags'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAll: (params: { query?: string }) =>
    useInfiniteQuery({
      queryKey: ['product-tags', params],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/product-tags', {
          params: { ...params, cursor: pageParam },
        })

        return data as ProductTagsFindAll
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['product-tag', { id }],
      queryFn: async () => {
        if (!id) return null

        const { data } = await client.get(`/product-tags/${id}`)
        return data as ProductTag
      },
    }),

  useEdit: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
  }) =>
    useMutation({
      mutationKey: ['edit-product-tag'],
      mutationFn: async ({ body }: { body: EditProductTagFormSchema }) => {
        return await client.put(`/product-tags/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['product-tags'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-tag', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useRemove: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
  }) =>
    useMutation({
      mutationKey: ['remove-product-tag'],
      mutationFn: async () => {
        return await client.delete(`/product-tags/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['product-tags'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-tag', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
