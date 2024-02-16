import Suppliers, {
  SuppliersFindAllInfiniteList,
} from '@/api/services/Suppliers'
import DropdownSubItemForFiltering from '@/components/filters/DropdownSubItemForFiltering'
import { Supplier } from '@/types/entities/Supplier'
import { useState } from 'react'

type Props = {
  ids: string[]
  setIds(ids?: string[]): void
}

export default function SelectSuppliersForFiltering({ ids, setIds }: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = Suppliers.useFindAllInfiniteList({ query })

  return (
    <DropdownSubItemForFiltering<Supplier, SuppliersFindAllInfiniteList>
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
      title='Поставщики'
    />
  )
}
