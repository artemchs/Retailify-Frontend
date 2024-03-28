import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { OnSuccess, SetErrorMessage } from './types'
import { CashRegisterOrderFormSchema } from '@/features/cash-register/types/cash-register-order-form-schema'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { FullOrder, Order } from '@/types/entities/Order'
import { FindAllInfo } from '@/types/FindAllInfo'
import { FindAllCashRegisterOrderSeachParamsSchema } from '@/features/cash-register/types/findAll-cash-register-order-search-params-schema'
import { FindAllInfiniteListCashRegisterOrderSeachParamsSchema } from '@/features/cash-register/types/findAllInfiniteList-order-schema'

export type OrdersFindAll = {
  items: Order[]
  info: FindAllInfo
}

export type OrdersFindAllInfinteList = {
  items: Order[]
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
      mutationKey: ['create-cash-register-order'],
      mutationFn: async ({ body }: { body: CashRegisterOrderFormSchema }) => {
        return await client.post('/orders', body, {
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
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAll: (searchParams: FindAllCashRegisterOrderSeachParamsSchema) =>
    useQuery({
      queryKey: ['cash-register-orders', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/orders', {
          params: searchParams,
        })
        return data as OrdersFindAll
      },
    }),

  useFindAllInfiniteList: (
    searchParams: FindAllInfiniteListCashRegisterOrderSeachParamsSchema
  ) =>
    useInfiniteQuery({
      queryKey: ['cash-register-orders-infinite-list', searchParams],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/orders/infinite-list', {
          params: { ...searchParams, cursor: pageParam },
        })

        return data as OrdersFindAllInfinteList
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['cash-register-order', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/orders/${id}`)
        return data as FullOrder
      },
    }),
}
