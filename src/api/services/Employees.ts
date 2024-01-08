import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { Employee } from '@/features/employees/types/employee'
import { EmployeesSearchParams } from '@/features/employees/types/searchParams'
import { OnSuccess, SetErrorMessage } from './types'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { CreateEmployeeFormType } from '@/features/employees/components/create/create-employee-form-schema'
import { EditEmployeeFormType } from '@/features/employees/components/edit/edit-employee-form-schema'

export type EmployeesFindAll = {
  items: Employee[]
  info: {
    totalPages: number
    totalItems: number
  }
}

export type EmployeesFindOne = {
  fullName: string
  email: string
  id: string
  profilePictureKey: string | null
  role: 'CASHIER' | 'ECOMMERCE_MANAGER'
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

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['employee', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/employees/${id}`)
        return data as EmployeesFindOne
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
      mutationFn: async (data: CreateEmployeeFormType) => {
        return await client.post('/employees', data)
      },
      onSuccess: () => {
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useEdit: ({
    setErrorMessage,
    onSuccess,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
  }) =>
    useMutation({
      mutationKey: ['edit-employee'],
      mutationFn: async (data: EditEmployeeFormType & { id: string }) => {
        return await client.put(`/employees/${data.id}`, {
          fullName: data.fullName,
          email: data.email,
          role: data.role,
        })
      },
      onSuccess: () => {
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
