import Warehouses from '@/api/services/Warehouses'
import CreateWarehouseDialog from '@/features/warehouses/components/actions/create/CreateWarehouseDialog'
import FilterWarehouses from '@/features/warehouses/components/table/FilterWarehouses'
import { columns } from '@/features/warehouses/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { warehousesRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function WarehousesPage() {
  const searchParams = useSearch({
    from: warehousesRoute.id,
  })

  const { data, isLoading, isError } = Warehouses.useFindAll(searchParams)

  return (
    <CrudLayout
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
      routeId='/layout/warehouses'
      title='Склады'
      topBarElements={
        <>
          <CreateWarehouseDialog />
          <FilterWarehouses />
        </>
      }
    />
  )
}
