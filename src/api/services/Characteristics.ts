import {
  Characteristic,
  CharacteristicValue,
} from '@/types/entities/Characteristic'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { CreateCharacteristicFormSchema } from '@/features/characteristics/types/create-characteristic-form-schema'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { EditCharacteristicFormSchema } from '@/features/characteristics/types/edit-characteristic-form-schema'
import { CreateCharacteristicValueFormSchema } from '@/features/characteristics/values/types/create-characteristic-value-form-schema'
import { EditCharacteristicValueFormSchema } from '@/features/characteristics/values/types/edit-characteristic-value-form-schema'

export type CharacteristicsFindAll = {
  items: Characteristic[]
  nextCursor?: string
}

export type CharacteristicValuesFindAll = {
  items: CharacteristicValue[]
  nextCursor?: string
}

export default {
  useCreate: ({
    setErrorMessage,
    onSuccess,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: (data: Characteristic) => void
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
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({
          queryKey: ['characteristics'],
        })
        onSuccess(data)
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAllForCategory: (params: {
    categoryId?: string
    categoryGroupId?: string
  }) =>
    useQuery({
      queryKey: ['characteristics-for-category', params],
      queryFn: async () => {
        const { data } = await client.get('/characteristics/for-category', {
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

  useFindOne: ({ id }: { id?: string }) =>
    useQuery({
      queryKey: ['characteristic', { id }],
      queryFn: async () => {
        if (!id) return null

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
    onSuccess: (data: Characteristic) => void
    id: string
  }) =>
    useMutation({
      mutationKey: ['edit-characteristic'],
      mutationFn: async ({ body }: { body: EditCharacteristicFormSchema }) => {
        return await client.put(`/characteristics/${id}`, body)
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({
          queryKey: ['characteristics'],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristic', { id }],
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

  useCreateValue: ({
    setErrorMessage,
    onSuccess,
    characteristicId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: (data: CharacteristicValue) => void
    characteristicId: string
  }) =>
    useMutation({
      mutationKey: ['create-characteristic-value'],
      mutationFn: async ({
        body,
      }: {
        body: CreateCharacteristicValueFormSchema
      }) => {
        return await client.post(
          `/characteristics/${characteristicId}/values`,
          body
        )
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({
          queryKey: ['characteristic-values'],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristics'],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristic', { id: characteristicId }],
        })
        onSuccess(data)
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAllValues: (characteristicId: string, params: { query?: string }) =>
    useInfiniteQuery({
      queryKey: ['characteristic-values', { params, characteristicId }],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get(
          `/characteristics/${characteristicId}/values`,
          {
            params: { ...params, cursor: pageParam },
          }
        )

        return data as CharacteristicValuesFindAll
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOneValue: ({
    id,
    characteristicId,
  }: {
    id?: string
    characteristicId: string
  }) =>
    useQuery({
      queryKey: ['characteristic-value', { id, characteristicId }],
      queryFn: async () => {
        if (!id) return null

        const { data } = await client.get(
          `/characteristics/${characteristicId}/values/${id}`
        )
        return data as CharacteristicValue
      },
    }),

  useEditValue: ({
    setErrorMessage,
    onSuccess,
    id,
    characteristicId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
    characteristicId: string
  }) =>
    useMutation({
      mutationKey: ['edit-characteristic-value'],
      mutationFn: async ({
        body,
      }: {
        body: EditCharacteristicValueFormSchema
      }) => {
        return await client.put(
          `/characteristics/${characteristicId}/values/${id}`,
          body
        )
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['characteristic-values'],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristic-value', { characteristicId, id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristics'],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristic', { id: characteristicId }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useRemoveValue: ({
    setErrorMessage,
    onSuccess,
    id,
    characteristicId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
    characteristicId: string
  }) =>
    useMutation({
      mutationKey: ['remove-characteristic-value'],
      mutationFn: async () => {
        return await client.delete(
          `/characteristics/${characteristicId}/values/${id}`
        )
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['characteristic-values'],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristic-value', { characteristicId, id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristics'],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristic', { id: characteristicId }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
