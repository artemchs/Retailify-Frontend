import { FindAllInfo } from '@/types/FindAllInfo'
import { Warehouse } from '@/types/entities/Warehouse'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import onErrorHandler from './utils/onErrorHandler'
import { AxiosError } from 'axios'
import { CreateWarehouseFormSchema } from '@/features/warehouses/components/actions/create/create-warehouse-form-schema'
import { WarehousesSearchParams } from '@/features/warehouses/types/searchParams'
import { EditWarehouseFormSchema } from '@/features/warehouses/components/actions/edit/edit-warehouse-form-schema'

export type WarehousesFindAll = {
  items: Warehouse[]
  info: FindAllInfo
}

export type WarehousesFindAllInfiniteList = {
  items: Warehouse[]
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
      mutationKey: ['create-warehouse'],
      mutationFn: async ({ body }: { body: CreateWarehouseFormSchema }) => {
        return await client.post('/warehouses', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['warehouses'],
        })
        queryClient.invalidateQueries({
          queryKey: ['warehouses-infinite-list'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAll: (searchParams: WarehousesSearchParams) =>
    useQuery({
      queryKey: ['warehouses', { ...searchParams }],
      queryFn: async () => {
        const { data } = await client.get('/warehouses', {
          params: {
            ...searchParams,
          },
        })

        return data as WarehousesFindAll
      },
    }),

  useGetAll: () =>
    useQuery({
      queryKey: ['warehouses-get-all'],
      queryFn: async () => {
        const { data } = await client.get('/warehouses/get-all')

        return data as {
          id: string
          name: string
        }[]
      },
    }),

  useFindAllInfiniteList: (params: { query?: string }) =>
    useInfiniteQuery({
      queryKey: ['warehouses-infinite-list', params],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/warehouses', {
          params: { ...params, cursor: pageParam },
        })

        return data as WarehousesFindAllInfiniteList
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['warehouse', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/warehouses/${id}`)
        return data as Warehouse
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
      mutationKey: ['edit-warehouse'],
      mutationFn: async ({ body }: { body: EditWarehouseFormSchema }) => {
        return await client.put(`/warehouses/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['warehouses'],
        })
        queryClient.invalidateQueries({
          queryKey: ['warehouses-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['warehouse', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['goods-receipts'],
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
      mutationKey: ['archive-warehouse'],
      mutationFn: async () => {
        return await client.delete(`/warehouses/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['warehouses'],
        })
        queryClient.invalidateQueries({
          queryKey: ['warehouses-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['warehouse', { id }],
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
      mutationKey: ['restore-warehouse'],
      mutationFn: async () => {
        return await client.put(`/warehouses/restore/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['warehouses'],
        })
        queryClient.invalidateQueries({
          queryKey: ['warehouses-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['warehouse', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
