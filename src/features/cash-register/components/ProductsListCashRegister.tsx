import Products from '@/api/services/Products'
import { DataTable } from '@/components/ui/data-table'
import { cashRegisterRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'
import { columns } from './products-table/columns'
import {
  CashRegisterRowSelectionState,
  CashRegisterSelectedProductState,
} from '@/pages/CashRegister'

export default function ProductsListCashRegister({
  setSelectedProducts,
  rowSelection,
  setRowSelection,
}: CashRegisterSelectedProductState & CashRegisterRowSelectionState) {
  const { page, rowsPerPage, orderBy, query, productIds, posId } = useSearch({
    from: cashRegisterRoute.id,
  })

  const { data, isLoading, isError } = Products.useFindAllVariants({
    page,
    rowsPerPage,
    isArchived: 0,
    orderBy,
    query,
    productIds,
    posId,
  })

  return (
    <div className='flex flex-col gap-4 max-h-full overflow-y-auto'>
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        isError={isError}
        routeId='/cash-register'
        topBarElements={<></>}
        totalPages={data?.info.totalPages ?? 1}
        selectedRows={rowSelection}
        setSelectedRows={setRowSelection}
        setSelectedRowsWithData={setSelectedProducts}
      />
    </div>
  )
}
