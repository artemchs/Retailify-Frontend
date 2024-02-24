import DropdownFilter from '@/components/filters/DropdownFilter'
import { DatePickerWithRange } from '@/components/ui/date-picker'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import SelectWarehousesForFiltering from '@/features/warehouses/components/shared/SelectWarehousesForFiltering'
import { inventoryAdjustmentsRoute } from '@/lib/router/routeTree'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { DateRange } from 'react-day-picker'
import SelectInventoryAdjustmentReasonsForFiltering from '../../reasons/components/shared/SelectInventoryAdjustmentReasonsForFiltering'
import IsArchivedSwitch from '@/components/filters/IsArchivedSwitch'

export default function FilterInventoryAdjustments() {
  const { isArchived, warehouseIds, reasonIds, date } = useSearch({
    from: inventoryAdjustmentsRoute.id,
  })
  const navigate = useNavigate()

  function numOfApplied() {
    let number = 0

    if (isArchived) number += 1
    if (date) number += 1

    for (const arr of [warehouseIds, reasonIds]) {
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

  function setWarehouseIds(values?: string[]) {
    navigate({
      search: (prev) => ({ ...prev, warehouseIds: values }),
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
        warehouseIds: undefined,
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
        ids={warehouseIds ?? []}
        setIds={setWarehouseIds}
      />
      <SelectInventoryAdjustmentReasonsForFiltering
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
