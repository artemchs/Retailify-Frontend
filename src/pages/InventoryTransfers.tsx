import InventoryTransfers from '@/api/services/InventoryTransfers'
import CreateInventoryTransferDialog from '@/features/inventory-transfers/components/actions/create/CreateInventoryTransferDialog'
import FilterInventoryTransfers from '@/features/inventory-transfers/components/table/FilterInventoryTransfers'
import { columns } from '@/features/inventory-transfers/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { inventoryTransfersRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function InventoryTransfersPage() {
  const searchParams = useSearch({
    from: inventoryTransfersRoute.id,
  })

  const { data, isLoading, isError } =
    InventoryTransfers.useFindAll(searchParams)

  return (
    <CrudLayout
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
      routeId='/layout/inventory-transfers'
      title='Перемещение товара между складами'
      topBarElements={
        <>
          <CreateInventoryTransferDialog />
          <FilterInventoryTransfers />
        </>
      }
    />
  )
}
