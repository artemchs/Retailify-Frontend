import InventoryAdjustments from '@/api/services/InventoryAdjustments'
import CreateInventoryAdjustmentDialog from '@/features/inventory-adjustments/components/actions/create/CreateInventoryAdjustmentDialog'
import FilterInventoryAdjustments from '@/features/inventory-adjustments/components/table/FilterInventoryAdjustments'
import { columns } from '@/features/inventory-adjustments/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { inventoryAdjustmentsRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function InventoryAdjustmentsPage() {
  const searchParams = useSearch({
    from: inventoryAdjustmentsRoute.id,
  })

  const { data, isLoading, isError } =
    InventoryAdjustments.useFindAll(searchParams)

  return (
    <CrudLayout
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
      routeId='/layout/inventory-adjustments'
      title='Инвентаризация товара'
      topBarElements={
        <>
          <CreateInventoryAdjustmentDialog />
          <FilterInventoryAdjustments />
        </>
      }
    />
  )
}
