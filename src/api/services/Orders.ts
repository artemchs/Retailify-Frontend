import { useMutation, useQuery } from '@tanstack/react-query'
import { OnSuccess, SetErrorMessage } from './types'
import { CashRegisterOrderFormSchema } from '@/features/cash-register/types/cash-register-order-form-schema'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { Order } from '@/types/entities/Order'
import { FindAllInfo } from '@/types/FindAllInfo'
import { FindAllCashRegisterOrderSeachParamsSchema } from '@/features/cash-register/types/findAll-cash-register-order-search-params-schema'

export type OrdersFindAll = {
  items: Order[]
  info: FindAllInfo
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

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['cash-register-order', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/orders/${id}`)
        return data as Order
      },
    }),
}
