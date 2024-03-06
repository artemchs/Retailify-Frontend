import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import CrudComboboxMultiple from '@/components/forms/CrudComboboxMultiple'
import Employees, {
  EmployeesFindAllInfiniteList,
} from '@/api/services/Employees'
import { Employee } from '@/types/entities/Employee'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  fieldName: string
}

export default function EmployeesCombobox({ field, form, fieldName }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Employees.useFindAllInfiniteList({ query })

  const selectedValues = field.value as Employee[]
  const setSelectedValues = (newValues: Employee[]) => {
    form.setValue(fieldName, newValues)
  }

  function onSuccess(id: string) {
    form.setValue(
      'characteristics',
      selectedValues.filter((obj) => obj.id !== id)
    )
  }

  return (
    <CrudComboboxMultiple<Employee, EmployeesFindAllInfiniteList>
      placeholder='Выберите пользователей'
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      status={status}
      setQuery={setQuery}
      idField='id'
      nameField='fullName'
      itemsField='items'
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      onSuccess={onSuccess}
    />
  )
}
