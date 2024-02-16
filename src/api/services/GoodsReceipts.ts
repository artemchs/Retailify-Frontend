import { GoodsReceiptsSearchParams } from '@/features/goods-receipts/types/searchParams'
import { FindAllInfo } from '@/types/FindAllInfo'
import { GoodsReceipt } from '@/types/entities/GoodsReceipt'
import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { OnSuccess, SetErrorMessage } from './types'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import onErrorHandler from './utils/onErrorHandler'
import { AxiosError } from 'axios'
import { CreateGoodsReceiptFormSchema } from '@/features/goods-receipts/types/create-goods-receipt-form-schema'
import { EditGoodsReceiptFormSchema } from '@/features/goods-receipts/types/edit-goods-receipt-form-schema'

export type GoodsReceiptFindAll = {
  items: GoodsReceipt[]
  info: FindAllInfo
}

export default {
  useFindAll: (searchParams: GoodsReceiptsSearchParams) =>
    useQuery({
      queryKey: ['goods-receipts', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/goods-receipts', {
          params: searchParams,
        })
        return data as GoodsReceiptFindAll
      },
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['goods-receipt', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/goods-receipts/${id}`)
        return data as GoodsReceipt
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
      mutationKey: ['create-goods-receipt'],
      mutationFn: async ({ body }: { body: CreateGoodsReceiptFormSchema }) => {
        return await client.post('/goods-receipts', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['goods-receipts'],
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
      mutationFn: async ({ body }: { body: EditGoodsReceiptFormSchema }) => {
        return await client.put(`/goods-receipts/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['products-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['goods-receipts'],
        })
        queryClient.invalidateQueries({
          queryKey: ['goods-receipt', { id }],
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
      mutationKey: ['archive-goods-receipt'],
      mutationFn: async () => {
        return await client.delete(`/goods-receipts/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['products-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['goods-receipts'],
        })
        queryClient.invalidateQueries({
          queryKey: ['goods-receipt', { id }],
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
      mutationKey: ['restore-goods-receipt'],
      mutationFn: async () => {
        return await client.put(`/goods-receipts/restore/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['products-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['goods-receipts'],
        })
        queryClient.invalidateQueries({
          queryKey: ['goods-receipt', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
