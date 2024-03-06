import { PosSearchParamsSchema } from '@/features/points-of-sale/types/point-of-sale-search-params'
import { FindAllInfo } from '@/types/FindAllInfo'
import { FullPointOfSale, PointOfSale } from '@/types/entities/PointOfSale'
import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { OnSuccess, SetErrorMessage } from './types'
import { CreatePosFormSchema } from '@/features/points-of-sale/types/create-point-of-sale-form-schema'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { EditPosFormSchema } from '@/features/points-of-sale/types/edit-point-of-sale-form-schema'

export type PosFindAll = {
  items: PointOfSale[]
  info: FindAllInfo
}

export default {
  useFindAll: (searchParams: PosSearchParamsSchema) =>
    useQuery({
      queryKey: ['points-of-sale', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/points-of-sale', {
          params: searchParams,
        })
        return data as PosFindAll
      },
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['point-of-sale', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/points-of-sale/${id}`)
        return data as FullPointOfSale
      },
    }),

  useCreate: ({
    setErrorMessage,
    onSuccess,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
  }) =>
    useMutation({
      mutationKey: ['create-point-of-sale'],
      mutationFn: async ({ body }: { body: CreatePosFormSchema }) => {
        return await client.post('/points-of-sale', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['points-of-sale'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
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
      mutationKey: ['edit-point-of-sale'],
      mutationFn: async ({ body }: { body: EditPosFormSchema }) => {
        return await client.put(`/points-of-sale/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['points-of-sale'],
        })
        queryClient.invalidateQueries({
          queryKey: ['point-of-sale', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useArchive: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
  }) =>
    useMutation({
      mutationKey: ['archive-point-of-sale'],
      mutationFn: async () => {
        return await client.delete(`/points-of-sale/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['points-of-sale'],
        })
        queryClient.invalidateQueries({
          queryKey: ['point-of-sale', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useRestore: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
  }) =>
    useMutation({
      mutationKey: ['restore-point-of-sale'],
      mutationFn: async () => {
        return await client.put(`/points-of-sale/restore/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['points-of-sale'],
        })
        queryClient.invalidateQueries({
          queryKey: ['point-of-sale', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
