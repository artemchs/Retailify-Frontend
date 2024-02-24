import { FindAllInfo } from '@/types/FindAllInfo'
import {
  FullInventoryAdjustment,
  InventoryAdjustment,
  InventoryAdjustmentReason,
} from '@/types/entities/InventoryAdjustment'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { OnSuccess, SetErrorMessage } from './types'
import { CreateInventoryAdjustmentFormSchema } from '@/features/inventory-adjustments/types/create-inventory-adjustment-form-schema'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { EditInventoryAdjustmentFormSchema } from '@/features/inventory-adjustments/types/edit-inventory-adjustment-form-schema'
import { CreateInventoryAdjustmentReasonFormSchema } from '@/features/inventory-adjustments/reasons/types/create-inventory-adjustment-reason-form-schema'
import { InventoryAdjustmentsSearchParamsSchema } from '@/features/inventory-adjustments/types/inventory-adjustment-search-params'
import { EditInventoryAdjustmentReasonFormSchema } from '@/features/inventory-adjustments/reasons/types/edit-inventory-adjustment-reason-form-schema'

export type InventoryAdjustmentsFindAll = {
  items: InventoryAdjustment[]
  info: FindAllInfo
}

export type InventoryAdjustmentReasonsFindAll = {
  items: InventoryAdjustmentReason[]
  nextCursor?: string
}

export default {
  useFindAll: (searchParams: InventoryAdjustmentsSearchParamsSchema) =>
    useQuery({
      queryKey: ['inventory-adjustments', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/inventory-adjustments', {
          params: searchParams,
        })
        return data as InventoryAdjustmentsFindAll
      },
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['inventory-adjustment', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/inventory-adjustments/${id}`)
        return data as FullInventoryAdjustment
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
      mutationKey: ['create-inventory-adjustment'],
      mutationFn: async ({
        body,
      }: {
        body: CreateInventoryAdjustmentFormSchema
      }) => {
        return await client.post('/inventory-adjustments', body)
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
          queryKey: ['inventory-adjustments'],
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
      mutationKey: ['edit-product'],
      mutationFn: async ({
        body,
      }: {
        body: EditInventoryAdjustmentFormSchema
      }) => {
        return await client.put(`/inventory-adjustments/${id}`, body)
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
          queryKey: ['inventory-adjustments'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustment', { id }],
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
      mutationKey: ['archive-inventory-adjustment'],
      mutationFn: async () => {
        return await client.delete(`/inventory-adjustments/${id}`)
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
          queryKey: ['inventory-adjustments'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustment', { id }],
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
      mutationKey: ['restore-inventory-adjustment'],
      mutationFn: async () => {
        return await client.put(`/inventory-adjustments/restore/${id}`)
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
          queryKey: ['inventory-adjustments'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustment', { id }],
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
      mutationKey: ['create-inventory-adjustment-reason'],
      mutationFn: async ({
        body,
      }: {
        body: CreateInventoryAdjustmentReasonFormSchema
      }) => {
        return await client.post('/inventory-adjustments/reasons', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustments'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustment'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustment-reasons'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAllReasons: (params: { query?: string }) =>
    useInfiniteQuery({
      queryKey: ['inventory-adjustment-reasons', params],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/inventory-adjustments/reasons', {
          params: { ...params, cursor: pageParam },
        })

        return data as InventoryAdjustmentReasonsFindAll
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOneReason: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['inventory-adjustment-reason', { id }],
      queryFn: async () => {
        const { data } = await client.get(
          `/inventory-adjustments/reasons/${id}`
        )
        return data as InventoryAdjustmentReason
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
      mutationKey: ['edit-inventory-adjustment-reason'],
      mutationFn: async ({
        body,
      }: {
        body: EditInventoryAdjustmentReasonFormSchema
      }) => {
        return await client.put(`/inventory-adjustments/reasons/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustments'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustment'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustment-reasons'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustment-reason', { id }],
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
      mutationKey: ['remove-inventory-adjustment-reason'],
      mutationFn: async () => {
        return await client.delete(`/inventory-adjustments/reasons/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustments'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustment'],
        })
        queryClient.invalidateQueries({
          queryKey: ['inventory-adjustment-reasons'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
