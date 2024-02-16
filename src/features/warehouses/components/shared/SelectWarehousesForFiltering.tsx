import Warehouses, {
  WarehousesFindAllInfiniteList,
} from '@/api/services/Warehouses'
import DropdownSubItemForFiltering from '@/components/filters/DropdownSubItemForFiltering'
import { Warehouse } from '@/types/entities/Warehouse'
import { useState } from 'react'

type Props = {
  ids: string[]
  setIds(ids?: string[]): void
}

export default function SelectWarehousesForFiltering({ ids, setIds }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Warehouses.useFindAllInfiniteList({ query })

  return (
    <DropdownSubItemForFiltering<Warehouse, WarehousesFindAllInfiniteList>
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      idField='id'
      ids={ids}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      itemsField='items'
      nameField='name'
      setIds={setIds}
      setQuery={setQuery}
      status={status}
      title='Склады'
    />
  )
}
