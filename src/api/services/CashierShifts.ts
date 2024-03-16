import { CashierShiftSearchParamsSchema } from '@/features/points-of-sale/cashier-shifts/types/cashier-shift-search-params'
import { FindAllInfo } from '@/types/FindAllInfo'
import { CashierShift } from '@/types/entities/CashierShift'
import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { OnSuccess, SetErrorMessage } from './types'
import { CreateCashierShiftFormSchema } from '@/features/points-of-sale/cashier-shifts/types/create-cashier-shift-form-schema'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { EditCashierShiftFormSchema } from '@/features/points-of-sale/cashier-shifts/types/edit-cashier-shift-form-schema'
import { CashierShiftTransactionFormSchema } from '@/features/points-of-sale/cashier-shifts/types/cashier-shift-transaction-form-schema'

export type CashierShiftsFindAll = {
  items: CashierShift[]
  info: FindAllInfo
}

export default {
  useFindAll: (searchParams: CashierShiftSearchParamsSchema, posId: string) =>
    useQuery({
      queryKey: ['cashier-shifts', { searchParams, posId }],
      queryFn: async () => {
        const { data } = await client.get(`/points-of-sale/${posId}/shifts`, {
          params: searchParams,
        })
        return data as CashierShiftsFindAll
      },
    }),

  useFindOne: ({ id, posId }: { id?: string; posId: string }) =>
    useQuery({
      queryKey: ['cashier-shift', { id, posId }],
      queryFn: async () => {
        if (!id || !posId) return null

        const { data } = await client.get(
          `/points-of-sale/${posId}/shifts/${id}`
        )
        return data as CashierShift
      },
    }),

  useCreate: ({
    setErrorMessage,
    onSuccess,
    posId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    posId: string
  }) =>
    useMutation({
      mutationKey: ['create-cashier-shift'],
      mutationFn: async ({ body }: { body: CreateCashierShiftFormSchema }) => {
        return await client.post(`/points-of-sale/${posId}/shifts`, body)
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({
          queryKey: ['points-of-sale'],
        })
        queryClient.invalidateQueries({
          queryKey: ['point-of-sale', { id: posId }],
        })
        queryClient.invalidateQueries({
          queryKey: ['cashier-shifts'],
        })
        onSuccess(data.id)
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useEdit: ({
    setErrorMessage,
    onSuccess,
    id,
    posId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
    posId: string
  }) =>
    useMutation({
      mutationKey: ['edit-cashier-shift'],
      mutationFn: async ({ body }: { body: EditCashierShiftFormSchema }) => {
        return await client.put(`/points-of-sale/${posId}/shifts/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['points-of-sale'],
        })
        queryClient.invalidateQueries({
          queryKey: ['point-of-sale', { id: posId }],
        })
        queryClient.invalidateQueries({
          queryKey: ['cashier-shifts'],
        })
        queryClient.invalidateQueries({
          queryKey: ['cashier-shift', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useClose: ({
    setErrorMessage,
    onSuccess,
    id,
    posId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
    posId: string
  }) =>
    useMutation({
      mutationKey: ['close-cashier-shift'],
      mutationFn: async () => {
        return await client.put(`/points-of-sale/${posId}/shifts/${id}/close`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['points-of-sale'],
        })
        queryClient.invalidateQueries({
          queryKey: ['point-of-sale', { id: posId }],
        })
        queryClient.invalidateQueries({
          queryKey: ['cashier-shifts'],
        })
        queryClient.invalidateQueries({
          queryKey: ['cashier-shift', { id, posId }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useDeposit: ({
    setErrorMessage,
    onSuccess,
    id,
    posId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
    posId: string
  }) =>
    useMutation({
      mutationKey: ['deposit-cashier-shift'],
      mutationFn: async ({
        body,
      }: {
        body: CashierShiftTransactionFormSchema
      }) => {
        return await client.post(
          `/points-of-sale/${posId}/shifts/${id}/deposit`,
          body
        )
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['points-of-sale'],
        })
        queryClient.invalidateQueries({
          queryKey: ['point-of-sale', { id: posId }],
        })
        queryClient.invalidateQueries({
          queryKey: ['cashier-shifts'],
        })
        queryClient.invalidateQueries({
          queryKey: ['cashier-shift', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useWithdrawal: ({
    setErrorMessage,
    onSuccess,
    id,
    posId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
    posId: string
  }) =>
    useMutation({
      mutationKey: ['withdrawal-cashier-shift'],
      mutationFn: async ({
        body,
      }: {
        body: CashierShiftTransactionFormSchema
      }) => {
        return await client.post(
          `/points-of-sale/${posId}/shifts/${id}/withdrawal`,
          body
        )
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['points-of-sale'],
        })
        queryClient.invalidateQueries({
          queryKey: ['point-of-sale', { id: posId }],
        })
        queryClient.invalidateQueries({
          queryKey: ['cashier-shifts'],
        })
        queryClient.invalidateQueries({
          queryKey: ['cashier-shift', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
