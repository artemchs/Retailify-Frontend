import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { Employee } from '@/features/employees/types/employee'
import { EmployeesSearchParams } from '@/features/employees/types/searchParams'
import { OnSuccess, SetErrorMessage } from './types'
import { CreateEmployeeFormType } from '@/features/employees/components/create-employee-form-schema'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'

export type EmployeesFindAll = {
  items: Employee[]
  info: {
    totalPages: number
    totalItems: number
  }
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
      queryKey: ['employees', page, rowsPerPage, query, roles, orderBy],
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
}
