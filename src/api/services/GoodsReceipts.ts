import { GoodsReceiptsSearchParams } from '@/features/goods-receipts/types/searchParams'
import { FindAllInfo } from '@/types/FindAllInfo'
import { GoodsReceipt } from '@/types/entities/GoodsReceipt'
import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { OnSuccess, SetErrorMessage } from './types'
import { CreateGoodsReceiptFormSchema } from '@/features/goods-receipts/components/actions/create/create-goods-receipt-form-schema'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import onErrorHandler from './utils/onErrorHandler'
import { AxiosError } from 'axios'

export type GoodsReceiptFindAll = {
  items: GoodsReceipt[]
  info: FindAllInfo
}

export default {
  useFindAll: ({
    page,
    rowsPerPage,
    query,
    orderBy,
  }: GoodsReceiptsSearchParams) =>
    useQuery({
      queryKey: ['goods-receipts', { page, rowsPerPage, query, orderBy }],
      queryFn: async () => {
        const { data } = await client.get('/goods-receipts', {
          params: {
            page,
            rowsPerPage,
            query,
            orderBy,
          },
        })
        return data as GoodsReceiptFindAll
      },
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['goods-receipt', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/goods-receipt/${id}`)
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
          queryKey: ['goods-receipts'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
