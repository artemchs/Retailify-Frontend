import Suppliers from '@/api/services/Suppliers'
import CreateSupplierDialog from '@/features/suppliers/actions/create/CreateSupplierDialog'
import { columns } from '@/features/suppliers/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { suppliersRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'

export default function SuppliersPage() {
  const searchParams = useSearch({
    from: suppliersRoute.id,
  })

  const { data, isLoading, isError } = Suppliers.useFindAll(searchParams)

  return (
    <CrudLayout
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
      routeId='/layout/suppliers'
      title='Поставщики'
      topBarElements={
        <>
          <CreateSupplierDialog />
        </>
      }
    />
  )
}
