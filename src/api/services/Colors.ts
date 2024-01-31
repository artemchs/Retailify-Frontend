import { Color } from '@/types/entities/Color'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { CreateColorFormSchema } from '@/features/colors/types/create-color-form-schema'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { EditColorFormSchema } from '@/features/colors/types/edit-color-form-schema'

export type ColorsFindAll = {
  items: Color[]
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
      mutationKey: ['create-color'],
      mutationFn: async ({ body }: { body: CreateColorFormSchema }) => {
        return await client.post('/colors', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['colors'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAll: (params: { query?: string }) =>
    useInfiniteQuery({
      queryKey: ['colors', params],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/colors', {
          params: { ...params, cursor: pageParam },
        })

        return data as ColorsFindAll
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['color', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/colors/${id}`)
        return data as Color
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
      mutationKey: ['edit-colors'],
      mutationFn: async ({ body }: { body: EditColorFormSchema }) => {
        return await client.put(`/colors/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['colors'],
        })
        queryClient.invalidateQueries({
          queryKey: ['color', { id }],
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
      mutationKey: ['remove-color'],
      mutationFn: async () => {
        return await client.delete(`/colors/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['colors'],
        })
        queryClient.invalidateQueries({
          queryKey: ['color', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
