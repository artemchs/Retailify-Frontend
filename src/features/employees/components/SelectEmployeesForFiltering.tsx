import Employees, {
  EmployeesFindAllInfiniteList,
} from '@/api/services/Employees'
import DropdownSubItemForFiltering from '@/components/filters/DropdownSubItemForFiltering'
import { Employee } from '@/types/entities/Employee'
import { useState } from 'react'

type Props = {
  ids: string[]
  setIds(ids?: string[]): void
  title?: string
}

export default function SelectEmployeesForFiltering({
  ids,
  setIds,
  title,
}: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Employees.useFindAllInfiniteList({ query })

  return (
    <DropdownSubItemForFiltering<Employee, EmployeesFindAllInfiniteList>
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      idField='id'
      ids={ids}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      itemsField='items'
      nameField='fullName'
      setIds={setIds}
      setQuery={setQuery}
      status={status}
      title={title ?? 'Сотрудники'}
    />
  )
}
