import { VariantAdditionalAttribute } from '@/types/entities/VariantAdditionalAttribute'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { EditVariantAdditionalAttributeFormSchema } from '@/features/variant-additional-attributes/types/edit-variant-additional-attribute-form-schema'
import { CreateVariantAdditionalAttributeFormSchema } from '@/features/variant-additional-attributes/types/create-variant-additiona-attribute-form-schema'

export type VariantAdditionalAttributesFindAll = {
  items: VariantAdditionalAttribute[]
  nextCursor?: string
}

export default function VariantAdditionalAttributes() {
  const MUTATION_KEYS = {
    CREATE: 'create-variant-additional-attribute',
    EDIT: 'edit-variant-additional-attribute',
    FIND_ONE: 'variant-additional-attribute',
    FIND_ALL: 'variant-additional-attributes',
    REMOVE: 'remove-variant-additional-attribute',
  }

  const clientWithBaseUrl = structuredClone(client) // Clone the configured axios instance
  clientWithBaseUrl.defaults.baseURL = `${client.defaults.baseURL}/variant-additional-attributes`

  return {
    useCreate: ({
      setErrorMessage,
      onSuccess,
    }: {
      setErrorMessage: SetErrorMessage
      onSuccess: (data: VariantAdditionalAttribute) => void
    }) =>
      useMutation({
        mutationKey: [MUTATION_KEYS.CREATE],
        mutationFn: async ({
          body,
        }: {
          body: CreateVariantAdditionalAttributeFormSchema
        }) => {
          return await client.post('/', body)
        },
        onSuccess: ({ data }) => {
          queryClient.invalidateQueries({
            queryKey: [MUTATION_KEYS.FIND_ALL],
          })
          onSuccess(data)
        },
        onError: (error: AxiosError) =>
          onErrorHandler({ error, setErrorMessage }),
      }),

    useFindAll: (params: { query?: string }) =>
      useInfiniteQuery({
        queryKey: [MUTATION_KEYS.FIND_ALL, params],
        queryFn: async ({ pageParam }) => {
          const { data } = await client.get('/', {
            params: { ...params, cursor: pageParam },
          })

          return data as VariantAdditionalAttributesFindAll
        },
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }),

    useFindOne: ({ id }: { id?: string }) =>
      useQuery({
        queryKey: [MUTATION_KEYS.FIND_ONE, { id }],
        queryFn: async () => {
          if (!id) return null

          const { data } = await client.get(`/${id}`)
          return data as VariantAdditionalAttribute
        },
      }),

    useEdit: ({
      setErrorMessage,
      onSuccess,
      id,
    }: {
      setErrorMessage: SetErrorMessage
      onSuccess: (data: VariantAdditionalAttribute) => void
      id: string
    }) =>
      useMutation({
        mutationKey: [MUTATION_KEYS.EDIT],
        mutationFn: async ({
          body,
        }: {
          body: EditVariantAdditionalAttributeFormSchema
        }) => {
          return await client.put(`/${id}`, body)
        },
        onSuccess: ({ data }) => {
          queryClient.invalidateQueries({
            queryKey: [MUTATION_KEYS.FIND_ALL],
          })
          queryClient.invalidateQueries({
            queryKey: [MUTATION_KEYS.FIND_ONE, { id }],
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
        mutationKey: [MUTATION_KEYS.REMOVE],
        mutationFn: async () => {
          return await client.delete(`/${id}`)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [MUTATION_KEYS.FIND_ALL],
          })
          queryClient.invalidateQueries({
            queryKey: [MUTATION_KEYS.FIND_ONE, { id }],
          })
          onSuccess()
        },
        onError: (error: AxiosError) =>
          onErrorHandler({ error, setErrorMessage }),
      }),
  }
}
