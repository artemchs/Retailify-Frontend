import Warehouses, {
  WarehousesFindAllInfiniteList,
} from '@/api/services/Warehouses'
import CrudComboboxSingle from '@/components/forms/CrudComboboxSingle'
import { Warehouse } from '@/types/entities/Warehouse'
import { useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'warehouseId'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function SelectWarehouse({ field, form }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Warehouses.useFindAllInfiniteList({ query })

  const selectedValue = field.value as string
  function setSelectedValue(id?: string) {
    form.setValue('warehouseId', id)
  }

  const selectedWarehouse = Warehouses.useFindOne({ id: selectedValue })

  return (
    <CrudComboboxSingle<Warehouse, WarehousesFindAllInfiniteList>
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
      placeholder='Выберите склад'
      selectedEntity={selectedWarehouse}
    />
  )
}
