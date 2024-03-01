import InventoryTransfers, {
  InventoryTransferReasonsFindAll,
} from '@/api/services/InventoryTransfers'
import DropdownSubItemForFiltering from '@/components/filters/DropdownSubItemForFiltering'
import { InventoryTransferReason } from '@/types/entities/InventoryTransfer'
import { useState } from 'react'

type Props = {
  ids: string[]
  setIds(ids?: string[]): void
}

export default function SelectInventoryTransferReasonsForFiltering({
  ids,
  setIds,
}: Props) {
  const [query, setQuery] = useState('')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = InventoryTransfers.useFindAllReasons({ query })

  return (
    <DropdownSubItemForFiltering<
      InventoryTransferReason,
      InventoryTransferReasonsFindAll
    >
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
      title='Причины'
    />
  )
}
