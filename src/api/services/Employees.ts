import { useQuery } from '@tanstack/react-query'
import client from '../client'
import { Employee } from '@/features/employees/types/employee'
import { EmployeesSearchParams } from '@/features/employees/types/searchParams'

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
}
