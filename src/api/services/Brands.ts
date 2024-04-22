import { Brand } from '@/types/entities/Brand'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { CreateBrandFormSchema } from '@/features/brands/types/create-brand-form-schema'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { EditBrandFormSchema } from '@/features/brands/types/edit-brand-form-schema'

export type BrandsFindAll = {
  items: Brand[]
  nextCursor?: string
}

export default {
  useCreate: ({
    setErrorMessage,
    onSuccess,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: (data: Brand) => void
  }) =>
    useMutation({
      mutationKey: ['create-brand'],
      mutationFn: async ({ body }: { body: CreateBrandFormSchema }) => {
        return await client.post('/brands', body)
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({
          queryKey: ['brands'],
        })
        onSuccess(data)
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAll: (params: { query?: string }) =>
    useInfiniteQuery({
      queryKey: ['brands', params],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/brands', {
          params: { ...params, cursor: pageParam },
        })

        return data as BrandsFindAll
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['brand', { id }],
      queryFn: async () => {
        if (!id) return null

        const { data } = await client.get(`/brands/${id}`)
        return data as Brand
      },
    }),

  useEdit: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: (data: Brand) => void
    id: string
  }) =>
    useMutation({
      mutationKey: ['edit-brand'],
      mutationFn: async ({ body }: { body: EditBrandFormSchema }) => {
        return await client.put(`/brands/${id}`, body)
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({
          queryKey: ['brands'],
        })
        queryClient.invalidateQueries({
          queryKey: ['brand', { id }],
        })
        onSuccess(data)
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
      mutationKey: ['remove-brand'],
      mutationFn: async () => {
        return await client.delete(`/brands/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['brands'],
        })
        queryClient.invalidateQueries({
          queryKey: ['brand', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
