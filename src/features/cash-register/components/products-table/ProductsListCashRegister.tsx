import Products from '@/api/services/Products'
import { DataTable } from '@/components/ui/data-table'
import { cashRegisterRoute } from '@/lib/router/routeTree'
import { useSearch } from '@tanstack/react-router'
import { columns } from './columns'
import { CashRegisterRowSelectionState } from '@/pages/CashRegister'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { CashRegisterItem } from '../../types/cash-register-order-form-schema'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'items'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function ProductsListCashRegister({
  field,
  form,
  rowSelection,
  setRowSelection,
}: Props & CashRegisterRowSelectionState) {
  const { page, rowsPerPage, orderBy, query, productIds, posId } = useSearch({
    from: cashRegisterRoute.id,
  })

  const items = field.value as CashRegisterItem[]
  function setSelectedRows(items: CashRegisterItem[]) {
    form.setValue('items', items)
  }

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
    <div className='flex flex-col w-full gap-4 max-h-full overflow-y-auto p-4'>
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
        selectedRowsWithData={items}
        setSelectedRowsWithData={setSelectedRows}
      />
    </div>
  )
}
