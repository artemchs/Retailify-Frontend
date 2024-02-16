import { FindAllInfo } from '@/types/FindAllInfo'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { Supplier } from '@/types/entities/Supplier'
import { SuppliersSearchParams } from '@/features/suppliers/types/searchParams'
import { OnSuccess, SetErrorMessage } from './types'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { CreateSupplierFormType } from '@/features/suppliers/components/actions/create/create-supplier-form-schema'
import { EditSupplierFormType } from '@/features/suppliers/components/actions/edit/edit-supplier-form-schema'

export type SuppliersFindAll = {
  items: Supplier[]
  info: FindAllInfo
}

export type SuppliersFindAllInfiniteList = {
  items: Supplier[]
  nextCursor?: string
}

export default {
  useFindAll: (searchParams: SuppliersSearchParams) =>
    useQuery({
      queryKey: ['suppliers', { ...searchParams }],
      queryFn: async () => {
        const { data } = await client.get('/suppliers', {
          params: {
            ...searchParams,
          },
        })

        return data as SuppliersFindAll
      },
    }),

  useFindAllInfiniteList: (params: { query?: string }) =>
    useInfiniteQuery({
      queryKey: ['suppliers-infinite-list', params],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/suppliers', {
          params: { ...params, cursor: pageParam },
        })

        return data as SuppliersFindAllInfiniteList
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useCreate: ({
    setErrorMessage,
    onSuccess,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
  }) =>
    useMutation({
      mutationKey: ['create-supplier'],
      mutationFn: async ({ body }: { body: CreateSupplierFormType }) => {
        return await client.post('/suppliers', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['suppliers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['suppliers-infinite-list'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['supplier', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/suppliers/${id}`)
        return data as Supplier
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
      mutationKey: ['edit-supplier'],
      mutationFn: async ({ body }: { body: EditSupplierFormType }) => {
        return await client.put(`/suppliers/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['suppliers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['suppliers-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['supplier', { id }],
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
      mutationKey: ['archive-supplier'],
      mutationFn: async () => {
        return await client.delete(`/suppliers/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['suppliers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['suppliers-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['supplier', { id }],
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
      mutationKey: ['restore-supplier'],
      mutationFn: async () => {
        return await client.put(`/suppliers/restore/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['suppliers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['suppliers-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['supplier', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
