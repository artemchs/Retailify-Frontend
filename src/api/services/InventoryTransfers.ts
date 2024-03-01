import { InventoryTransfersSearchParamsSchema } from '@/features/inventory-transfers/types/inventory-transfer-search-params'
import { FindAllInfo } from '@/types/FindAllInfo'
import {
  FullInventoryTransfer,
  InventoryTransfer,
  InventoryTransferReason,
} from '@/types/entities/InventoryTransfer'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { OnSuccess, SetErrorMessage } from './types'
import { CreateInventoryTransferFormSchema } from '@/features/inventory-transfers/types/create-inventory-transfer-form-schema'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { EditInventoryTransferFormSchema } from '@/features/inventory-transfers/types/edit-inventory-transfer-form-schema'
import { CreateInventoryTransferReasonFormSchema } from '@/features/inventory-transfers/reasons/types/create-inventory-transfer-reason-form-schema'
import { EditInventoryTransferReasonFormSchema } from '@/features/inventory-transfers/reasons/types/edit-inventory-transfer-reason-form-schema'

export type InventoryTransfersFindAll = {
  items: InventoryTransfer[]
  info: FindAllInfo
}

export type InventoryTransferReasonsFindAll = {
  items: InventoryTransferReason[]
  nextCursor?: string
}

export default {
  useFindAll: (searchParams: InventoryTransfersSearchParamsSchema) =>
    useQuery({
      queryKey: ['inventory-transfers', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/inventory-transfers', {
          params: searchParams,
        })
        return data as InventoryTransfersFindAll
      },
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['inventory-transfer', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/inventory-transfers/${id}`)
        return data as FullInventoryTransfer
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
      mutationKey: ['create-inventory-transfer'],
      mutationFn: async ({
        body,
      }: {
        body: CreateInventoryTransferFormSchema
      }) => {
        return await client.post('/inventory-transfers', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants'],
        })
        queryClient.invalidateQueries({
          queryKey: ['products-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfers'],
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
      mutationKey: ['edit-inventory-transfer'],
      mutationFn: async ({
        body,
      }: {
        body: EditInventoryTransferFormSchema
      }) => {
        return await client.put(`/inventory-transfers/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants'],
        })
        queryClient.invalidateQueries({
          queryKey: ['products-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfer', { id }],
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
      mutationKey: ['archive-inventory-transfer'],
      mutationFn: async () => {
        return await client.delete(`/inventory-transfers/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants'],
        })
        queryClient.invalidateQueries({
          queryKey: ['products-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfer', { id }],
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
      mutationKey: ['restore-inventory-transfer'],
      mutationFn: async () => {
        return await client.put(`/inventory-transfers/restore/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants'],
        })
        queryClient.invalidateQueries({
          queryKey: ['products-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfer', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useCreateReason: ({
    setErrorMessage,
    onSuccess,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
  }) =>
    useMutation({
      mutationKey: ['create-inventory-transfer-reason'],
      mutationFn: async ({
        body,
      }: {
        body: CreateInventoryTransferReasonFormSchema
      }) => {
        return await client.post('/inventory-transfers/reasons', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfer'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfer-reasons'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAllReasons: (params: { query?: string }) =>
    useInfiniteQuery({
      queryKey: ['inventory-transfer-reasons', params],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/inventory-transfers/reasons', {
          params: { ...params, cursor: pageParam },
        })

        return data as InventoryTransferReasonsFindAll
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOneReason: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['inventory-transfer-reason', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/inventory-transfers/reasons/${id}`)
        return data as InventoryTransferReason
      },
    }),

  useEditReason: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
  }) =>
    useMutation({
      mutationKey: ['edit-inventory-transfer-reason'],
      mutationFn: async ({
        body,
      }: {
        body: EditInventoryTransferReasonFormSchema
      }) => {
        return await client.put(`/inventory-transfers/reasons/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfer'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfer-reasons'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfer-reason', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useRemoveReason: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
  }) =>
    useMutation({
      mutationKey: ['remove-inventory-transfer-reason'],
      mutationFn: async () => {
        return await client.delete(`/inventory-transfers/reasons/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfer'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-transfer-reasons'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
