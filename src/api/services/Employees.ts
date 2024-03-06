import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { EmployeesSearchParams } from '@/features/employees/types/searchParams'
import { OnSuccess, SetErrorMessage } from './types'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { CreateEmployeeFormType } from '@/features/employees/components/create/create-employee-form-schema'
import { FindAllInfo } from '@/types/FindAllInfo'
import { Employee } from '@/types/entities/Employee'
import { EditEmployeeFormType } from '@/features/employees/components/edit/edit-employee-form-schema'
import { queryClient } from '@/lib/query-client/tanstack-query-client'

export type EmployeesFindAll = {
  items: Employee[]
  info: FindAllInfo
}

export type EmployeesFindAllInfiniteList = {
  items: Employee[]
  nextCursor?: string
}

export default {
  useFindAll: ({
    page,
    rowsPerPage,
    query,
    roles,
    orderBy,
  }: EmployeesSearchParams) =>
    useQuery({
      queryKey: ['employees', { page, rowsPerPage, query, roles, orderBy }],
      queryFn: async () => {
        const { data } = await client.get('/employees', {
          params: {
            page,
            rowsPerPage,
            query,
            roles,
            orderBy,
          },
        })
        return data as EmployeesFindAll
      },
    }),

  useFindAllInfiniteList: (params: { query?: string }) =>
    useInfiniteQuery({
      queryKey: ['brands', params],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/employees/infinite-list', {
          params: { ...params, cursor: pageParam },
        })

        return data as EmployeesFindAllInfiniteList
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['employee', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/employees/${id}`)
        return data as Employee
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
      mutationKey: ['create-employee'],
      mutationFn: async ({ body }: { body: CreateEmployeeFormType }) => {
        return await client.post('/employees', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['employees'],
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
      mutationKey: ['edit-employee'],
      mutationFn: async ({ body }: { body: EditEmployeeFormType }) => {
        return await client.put(`/employees/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['employees'],
        })
        queryClient.invalidateQueries({
          queryKey: ['employee', { id }],
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
      mutationKey: ['delete-employee'],
      mutationFn: async () => {
        return await client.delete(`/employees/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['employees'],
        })
        queryClient.invalidateQueries({
          queryKey: ['employee', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
