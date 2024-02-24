import InventoryAdjustments, {
  InventoryAdjustmentReasonsFindAll,
} from '@/api/services/InventoryAdjustments'
import DropdownSubItemForFiltering from '@/components/filters/DropdownSubItemForFiltering'
import { InventoryAdjustmentReason } from '@/types/entities/InventoryAdjustment'
import { useState } from 'react'

type Props = {
  ids: string[]
  setIds(ids?: string[]): void
}

export default function SelectInventoryAdjustmentReasonsForFiltering({
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
  } = InventoryAdjustments.useFindAllReasons({ query })

  return (
    <DropdownSubItemForFiltering<
      InventoryAdjustmentReason,
      InventoryAdjustmentReasonsFindAll
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
