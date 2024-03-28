import { FindAllInfo } from '@/types/FindAllInfo'
import { Refund } from '@/types/entities/Refund'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { CreateRefundSchema } from '@/features/refunds/types/create-refund-schema'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { FindAllRefundSchema } from '@/features/refunds/types/findAll-refund-schema'
import { FindAllInfiniteListRefundSchema } from '@/features/refunds/types/findAllInfiniteList-refund-schema'

export type RefundsFindAll = {
  items: Refund[]
  info: FindAllInfo
}

export type RefundsFindAllInfiniteList = {
  items: Refund[]
  nextCursor?: string
}

export default {
  useCreate: ({
    setErrorMessage,
    onSuccess,
    shiftId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    shiftId: string
  }) =>
    useMutation({
      mutationKey: ['create-refund'],
      mutationFn: async ({ body }: { body: CreateRefundSchema }) => {
        return await client.post('/refunds', body, {
          params: {
            shiftId,
          },
        })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants'],
        })
        queryClient.invalidateQueries({
          queryKey: ['orders'],
        })
        queryClient.invalidateQueries({
          queryKey: ['refunds'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAll: (searchParams: FindAllRefundSchema) =>
    useQuery({
      queryKey: ['refunds', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/refunds', {
          params: searchParams,
        })
        return data as RefundsFindAll
      },
    }),

  useFindAllInfiniteList: (searchParams: FindAllInfiniteListRefundSchema) =>
    useInfiniteQuery({
      queryKey: ['refunds-infinite-list', searchParams],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/refunds/infinite-list', {
          params: { ...searchParams, cursor: pageParam },
        })

        return data as RefundsFindAllInfiniteList
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['refund', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/refunds/${id}`)
        return data as Refund
      },
    }),
}
