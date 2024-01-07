import Employees from '@/api/services/Employees'
import CreateEmployeeDialog from '@/features/employees/components/create/CreateEmployeeDialog'
import FilterEmployees from '@/features/employees/components/FilterEmployees'
import { columns } from '@/features/employees/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { employeesRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function EmployeesPage() {
  const { page, rowsPerPage, query, roles, orderBy } = useSearch({
    from: employeesRoute.id,
  })

  const { data, isLoading, isError } = Employees.useFindAll({
    page,
    rowsPerPage,
    query,
    roles,
    orderBy,
  })

  return (
    <CrudLayout
      data={data}
      columns={columns}
      routeId='/layout/employees'
      isLoading={isLoading}
      isError={isError}
      title='Сотрудники'
      topBarElements={
        <>
          <CreateEmployeeDialog />
          <FilterEmployees />
        </>
      }
    />
  )
}
