import DropdownFilter from '@/components/filters/DropdownFilter'
import { pointsOfSaleRoute } from '@/lib/router/routeTree'
import { useNavigate, useSearch } from '@tanstack/react-router'
import IsArchivedSwitch from '@/components/filters/IsArchivedSwitch'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import SelectProductTagsForFiltering from '@/features/product-tags/components/shared/SelectProductTagsForFiltering'
import SelectCategoryGroupsForFiltering from '@/features/category-groups/components/shared/SelectCategoryGroupsForFiltering'
import SelectCategoriesForFiltering from '@/features/categories/components/shared/SelectCategoriesForFiltering'
import SelectEmployeesForFiltering from '@/features/employees/components/SelectEmployeesForFiltering'
import SelectWarehousesForFiltering from '@/features/warehouses/components/shared/SelectWarehousesForFiltering'

export default function FilterPointsOfSale() {
  const {
    isArchived,
    cashierIds,
    productTagIds,
    categoryGroupIds,
    categoryIds,
    warehouseIds,
  } = useSearch({
    from: pointsOfSaleRoute.id,
  })
  const navigate = useNavigate()

  function numOfApplied() {
    let number = 0

    if (isArchived) number += 1

    for (const arr of [
      productTagIds,
      cashierIds,
      categoryGroupIds,
      categoryIds,
      warehouseIds,
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

  function setProductTagIds(values?: string[]) {
    navigate({
      search: (prev) => ({ ...prev, productTagIds: values }),
    })
  }

  function setCategoryGroupIds(values?: string[]) {
    navigate({
      search: (prev) => ({ ...prev, categoryGroupIds: values }),
    })
  }

  function setCategoryIds(values?: string[]) {
    navigate({
      search: (prev) => ({ ...prev, categoryIds: values }),
    })
  }

  function setCashierIds(values?: string[]) {
    navigate({
      search: (prev) => ({ ...prev, cashierIds: values }),
    })
  }

  function setWarehouseIds(values?: string[]) {
    navigate({
      search: (prev) => ({ ...prev, warehouseIds: values }),
    })
  }

  function resetFilters() {
    navigate({
      search: (prev) => ({
        ...prev,
        isArchived: 0,
        productTagIds: undefined,
        categoryGroupIds: undefined,
        categoryIds: undefined,
        cashierIds: undefined,
        warehouseIds: undefined,
      }),
    })
  }

  return (
    <DropdownFilter numOfApplied={numOfApplied()} resetFilters={resetFilters}>
      <SelectWarehousesForFiltering
        ids={warehouseIds ?? []}
        setIds={setWarehouseIds}
        title='Склад'
      />
      <SelectProductTagsForFiltering
        ids={productTagIds ?? []}
        setIds={setProductTagIds}
      />
      <SelectCategoryGroupsForFiltering
        ids={categoryGroupIds ?? []}
        setIds={setCategoryGroupIds}
      />
      <SelectCategoriesForFiltering
        ids={categoryIds ?? []}
        setIds={setCategoryIds}
      />
      <SelectEmployeesForFiltering
        ids={cashierIds ?? []}
        setIds={setCashierIds}
        title='Кассиры'
      />
      <DropdownMenuSeparator />
      <IsArchivedSwitch
        setIsArchived={setIsArchived}
        isArchived={isArchived ? Boolean(isArchived) : false}
      />
    </DropdownFilter>
  )
}
