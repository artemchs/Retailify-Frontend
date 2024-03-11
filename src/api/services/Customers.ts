import { FindAllInfo } from '@/types/FindAllInfo'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { CreateCustomerFormSchema } from '@/features/customers/types/create-customer-form-schema'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { FindAllCustomerSchema } from '@/features/customers/types/find-all-customer-schema'
import { FindAllInfiniteListCustomerSchema } from '@/features/customers/types/find-all-infinite-list-customer-schema'
import { Customer } from '@/types/entities/Customer'
import { EditCustomerFormSchema } from '@/features/customers/types/edit-customer-form-schema'

export type CustomersFindAll = {
  items: Customer[]
  info: FindAllInfo
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
      mutationKey: ['create-customer'],
      mutationFn: async ({ body }: { body: CreateCustomerFormSchema }) => {
        return await client.post('/customers', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['customers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['customers-infinite-list'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAll: (searchParams: FindAllCustomerSchema) =>
    useQuery({
      queryKey: ['customers', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/customers', {
          params: searchParams,
        })

        return data as CustomersFindAll
      },
    }),

  useFindAllInfiniteList: (searchParams: FindAllInfiniteListCustomerSchema) =>
    useInfiniteQuery({
      queryKey: ['customers-infinite-list', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/customers/infinite-list', {
          params: searchParams,
        })

        return data as {
          items: Customer[]
          nextCursor?: string
        }
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['customer', { id }],
      queryFn: async () => {
        if (!id) return null

        const { data } = await client.get(`/customers/${id}`)
        return data as Customer
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
      mutationKey: ['edit-customer'],
      mutationFn: async ({ body }: { body: EditCustomerFormSchema }) => {
        return await client.put(`/customers/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['customers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['customer', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['customers-infinite-list'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useRemove: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
  }) =>
    useMutation({
      mutationKey: ['remove-customer'],
      mutationFn: async () => {
        return await client.delete(`/customers/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['customers'],
        })
        queryClient.invalidateQueries({
          queryKey: ['customers-infinite-list'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
