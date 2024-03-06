import DropdownFilter from '@/components/filters/DropdownFilter'
import { DatePickerWithRange } from '@/components/ui/date-picker'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import SelectWarehousesForFiltering from '@/features/warehouses/components/shared/SelectWarehousesForFiltering'
import { inventoryTransfersRoute } from '@/lib/router/routeTree'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { DateRange } from 'react-day-picker'
import IsArchivedSwitch from '@/components/filters/IsArchivedSwitch'
import SelectInventoryTransferReasonsForFiltering from '../../reasons/components/shared/SelectInventoryTransferReasonForFiltering'

export default function FilterInventoryTransfers() {
  const {
    isArchived,
    destinationWarehouseIds,
    sourceWarehouseIds,
    date,
    reasonIds,
  } = useSearch({
    from: inventoryTransfersRoute.id,
  })
  const navigate = useNavigate()

  function numOfApplied() {
    let number = 0

    if (isArchived) number += 1
    if (date) number += 1

    for (const arr of [
      sourceWarehouseIds,
      destinationWarehouseIds,
      reasonIds,
    ]) {
      if (arr && arr.length >= 1) {
        number += 1
      }
    }

    return number
  }

  function setIsArchived(value: number) {
    navigate({
      search: (prev) => ({ ...prev, isArchived: value }),
    })
  }

  function setSourceWarehouseIds(values?: string[]) {
    navigate({
      search: (prev) => ({ ...prev, sourceWarehouseIds: values }),
    })
  }

  function setDestinationWarehouseIds(values?: string[]) {
    navigate({
      search: (prev) => ({ ...prev, destinationWarehouseIds: values }),
    })
  }

  function setReasonIds(values?: string[]) {
    navigate({
      search: (prev) => ({ ...prev, reasonIds: values }),
    })
  }

  function setDateRange(value?: DateRange) {
    navigate({
      search: (prev) => ({ ...prev, date: value }),
    })
  }

  function resetFilters() {
    navigate({
      search: (prev) => ({
        ...prev,
        isArchived: 0,
        sourceWarehouseIds: undefined,
        destinationWarehouseIds: undefined,
        reasonIds: undefined,
        date: undefined,
      }),
    })
  }

  return (
    <DropdownFilter numOfApplied={numOfApplied()} resetFilters={resetFilters}>
      <div className='p-2'>
        <DatePickerWithRange
          date={{
            from: date?.from,
            to: date?.to,
          }}
          setDate={setDateRange}
        />
      </div>
      <DropdownMenuSeparator />
      <SelectWarehousesForFiltering
        ids={sourceWarehouseIds ?? []}
        setIds={setSourceWarehouseIds}
        title='Со склада'
      />
      <SelectWarehousesForFiltering
        ids={destinationWarehouseIds ?? []}
        setIds={setDestinationWarehouseIds}
        title='На склад'
      />
      <SelectInventoryTransferReasonsForFiltering
        ids={reasonIds ?? []}
        setIds={setReasonIds}
      />
      <DropdownMenuSeparator />
      <IsArchivedSwitch
        setIsArchived={setIsArchived}
        isArchived={isArchived ? Boolean(isArchived) : false}
      />
    </DropdownFilter>
  )
}
