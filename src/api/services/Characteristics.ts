import { Characteristic } from '@/types/entities/Characteristic'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { CreateCharacteristicFormSchema } from '@/features/characteristics/types/create-characteristic-form-schema'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { EditCharacteristicFormSchema } from '@/features/characteristics/types/edit-characteristic-form-schema'

export type CharacteristicsFindAll = {
  items: Characteristic[]
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
      mutationKey: ['create-characteristic'],
      mutationFn: async ({
        body,
      }: {
        body: CreateCharacteristicFormSchema
      }) => {
        return await client.post('/characteristics', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['characteristics'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAllForCollection: (params: { collectionId: string }) =>
    useQuery({
      queryKey: ['characteristics', params],
      queryFn: async () => {
        const { data } = await client.get('/characteristics/for-collection', {
          params,
        })

        return data as Characteristic[]
      },
    }),

  useFindAll: (params: { query?: string }) =>
    useInfiniteQuery({
      queryKey: ['characteristics', params],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/characteristics', {
          params: { ...params, cursor: pageParam },
        })

        return data as CharacteristicsFindAll
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['characteristic', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/characteristics/${id}`)
        return data as Characteristic
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
      mutationKey: ['edit-characteristic'],
      mutationFn: async ({ body }: { body: EditCharacteristicFormSchema }) => {
        return await client.put(`/characteristics/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['characteristics'],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristic', { id }],
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
      mutationKey: ['remove-characteristic'],
      mutationFn: async () => {
        return await client.delete(`/characteristics/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['characteristics'],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristic', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
