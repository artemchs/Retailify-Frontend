import Suppliers, {
  SuppliersFindAllInfiniteList,
} from '@/api/services/Suppliers'
import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { Supplier } from '@/types/entities/Supplier'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'supplierId'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function SelectSupplier({ field, form }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Suppliers.useFindAllInfiniteList({ query })

  const selectedValue = field.value as string
  function setSelectedValue(id?: string) {
    form.setValue('supplierId', id)
  }

  const selectedSupplier = Suppliers.useFindOne({ id: selectedValue })

  return (
    <CrudComboboxSingle<Supplier, SuppliersFindAllInfiniteList>
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      status={status}
      setSelectedValue={setSelectedValue}
      selectedValue={selectedValue}
      itemsField='items'
      nameField='name'
      idField='id'
      setQuery={setQuery}
      placeholder='Выберите поставщика'
      selectedEntity={selectedSupplier}
    />
  )
}
