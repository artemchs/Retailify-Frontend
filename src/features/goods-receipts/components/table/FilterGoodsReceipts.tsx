import ComboboxSubItemForArrayValues from '@/components/filters/ComboboxSubItemForArrayValues'
import DropdownFilter from '@/components/filters/DropdownFilter'
import IsArchivedSwitch from '@/components/filters/IsArchivedSwitch'
import { goodsReceiptsRoute } from '@/lib/router/routeTree'
import { FilterOptions } from '@/types/FilterOptions'
import { useNavigate, useSearch } from '@tanstack/react-router'
import {
  paymentOptions as pOptions,
} from '@/types/entities/GoodsReceipt'
import { DatePickerWithRange } from '@/components/ui/date-picker'
import { DateRange } from 'react-day-picker'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import NumberRangeFilters, {
  NumbersRange,
} from '@/components/filters/NumberRangeFilters'
import { Label } from '@/components/ui/label'
import SelectWarehousesForFiltering from '@/features/warehouses/components/shared/SelectWarehousesForFiltering'
import SelectSuppliersForFiltering from '@/features/suppliers/components/shared/SelectSuppliersForFiltering'

export default function FilterGoodsReceipts() {
  const paymentOptionsArray: FilterOptions = Object.entries(pOptions).map(
    ([value, label]) => ({
      label,
      value,
    })
  )

  const {
    isArchived,
    supplierIds,
    warehouseIds,
    paymentOptions,
    goodsReceiptDate,
    totalCost,
  } = useSearch({
    from: goodsReceiptsRoute.id,
  })
  const navigate = useNavigate()

  function numOfApplied() {
    let number = 0

    if (isArchived) number += 1
    if (goodsReceiptDate) number += 1
    if (
      totalCost &&
      ((totalCost.from && !isNaN(totalCost.from)) ||
        (totalCost.to && !isNaN(totalCost.to)))
    )
      number += 1

    for (const arr of [
      warehouseIds,
      supplierIds,
      paymentOptions,
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

  function setWarehouseIds(values?: string[]) {
    navigate({
      search: (prev) => ({ ...prev, warehouseIds: values }),
    })
  }

  function setSupplierIds(values?: string[]) {
    navigate({
      search: (prev) => ({ ...prev, supplierIds: values }),
    })
  }

  function setPaymentOptions(values: string[]) {
    navigate({
      search: (prev) => ({ ...prev, paymentOptions: values }),
    })
  }

  function setDateRange(value?: DateRange) {
    navigate({
      search: (prev) => ({ ...prev, goodsReceiptDate: value }),
    })
  }

  function setTotalCostRange(value?: NumbersRange) {
    navigate({
      search: (prev) => ({ ...prev, totalCost: value }),
    })
  }

  function resetFilters() {
    navigate({
      search: (prev) => ({
        ...prev,
        isArchived: 0,
        warehouseIds: undefined,
        supplierIds: undefined,
        paymentOptions: undefined,
        goodsReceiptDate: undefined,
        totalCost: undefined,
      }),
    })
  }

  return (
    <DropdownFilter numOfApplied={numOfApplied()} resetFilters={resetFilters}>
      <div className='p-2 flex flex-col gap-2'>
        <DatePickerWithRange
          date={{
            from: goodsReceiptDate?.from,
            to: goodsReceiptDate?.to,
          }}
          setDate={setDateRange}
        />
        <div className='flex flex-col gap-1'>
          <Label className='text-xs'>Общая стоимость:</Label>
          <NumberRangeFilters range={totalCost} setRange={setTotalCostRange} />
        </div>
      </div>
      <DropdownMenuSeparator />
      <SelectWarehousesForFiltering
        ids={warehouseIds ?? []}
        setIds={setWarehouseIds}
      />
      <SelectSuppliersForFiltering
        ids={supplierIds ?? []}
        setIds={setSupplierIds}
      />
      <ComboboxSubItemForArrayValues
        title='Способы оплаты'
        options={paymentOptionsArray}
        values={paymentOptions ?? []}
        setValues={setPaymentOptions}
      />
      <DropdownMenuSeparator />
      <IsArchivedSwitch
        setIsArchived={setIsArchived}
        isArchived={isArchived ? Boolean(isArchived) : false}
      />
    </DropdownFilter>
  )
}
