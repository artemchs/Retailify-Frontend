import Products from '@/api/services/Products'
import Warehouses from '@/api/services/Warehouses'
import CreateProductVariantDialog from '@/features/products/variants/components/actions/create/CreateProductVariantDialog'
import { columns as baseColumns } from '@/features/products/variants/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { Variant } from '@/types/entities/Variant'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

export default function ProductVariantsPage() {
  const { data, isLoading, isError } = Products.useFindAllVariants({
    page: 1,
    rowsPerPage: 20,
  })
  const { data: warehousesData, isLoading: isLoadingWarehouses } =
    Warehouses.useGetAll()
  const [columns, setColumns] = useState<ColumnDef<Variant>[]>(baseColumns)

  useEffect(() => {
    if (warehousesData) {
      const warehouseColumns: ColumnDef<Variant>[] = warehousesData.map(
        ({ id, name }) => ({
          id: `warehouse-${id}`,
          header: name,
          cell: ({ row }) => {
            const quantity =
              row.original.warehouseStockEntries?.find(
                (obj) => obj.warehouseId === id
              )?.warehouseQuantity ?? 0

            return <div className='text-right'>{quantity}</div>
          },
        })
      )

      setColumns([...baseColumns, ...warehouseColumns])
    }
  }, [warehousesData])

  return (
    <>
      <CrudLayout
        columns={columns}
        data={data}
        isError={isError || isLoadingWarehouses}
        isLoading={isLoading || isLoadingWarehouses}
        routeId='/layout/product-variants'
        title='Варианты товара'
        topBarElements={<CreateProductVariantDialog />}
      />
    </>
  )
}
