import { FindAllInfo } from '@/types/FindAllInfo'
import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { Supplier } from '@/types/entities/Supplier'
import { SuppliersSearchParams } from '@/features/suppliers/types/searchParams'
import { OnSuccess, SetErrorMessage } from './types'
import { CreateSupplierFormType } from '@/features/suppliers/actions/create/create-supplier-form-schema'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { EditSupplierFormType } from '@/features/suppliers/actions/edit/edit-supplier-form-schema'
import { queryClient } from '@/lib/query-client/tanstack-query-client'

export type SuppliersFindAll = {
  items: Supplier[]
  info: FindAllInfo
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
          queryKey: ['supplier', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useDelete: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
  }) =>
    useMutation({
      mutationKey: ['delete-supplier'],
      mutationFn: async () => {
        return await client.delete(`/suppliers/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['suppliers'],
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
