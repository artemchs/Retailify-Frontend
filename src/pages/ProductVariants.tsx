import Products from '@/api/services/Products'
import Warehouses from '@/api/services/Warehouses'
import CreateProductVariantDialog from '@/features/products/variants/components/actions/create/CreateProductVariantDialog'
import BatchEditVariantsDialog from '@/features/products/variants/components/batch-edit/BatchEditVariantsDialog'
import FilterVariants from '@/features/products/variants/components/table/FilterVariants'
import { columns as baseColumns } from '@/features/products/variants/components/table/columns'
import CrudLayout from '@/layouts/CrudLayout'
import { productVariantsRoute } from '@/lib/router/routeTree'
import { Variant } from '@/types/entities/Variant'
import { useSearch } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

export default function ProductVariantsPage() {
    const searchParams = useSearch({
        from: productVariantsRoute.id,
    })

    const { data, isLoading, isError } =
        Products.useFindAllVariants(searchParams)
    const { data: warehousesData, isLoading: isLoadingWarehouses } =
        Warehouses.useGetAll()
    const [columns, setColumns] = useState<ColumnDef<Variant>[]>(baseColumns)

    useEffect(() => {
        if (warehousesData) {
            const warehouseColumns: ColumnDef<Variant>[] = warehousesData.map(
                ({ id, name }) => ({
                    id: `warehouse-${id}`,
                    header: () => (
                        <div className='w-40 text-right'>{name} (шт)</div>
                    ),
                    cell: ({ row }) => {
                        const quantity =
                            row.original.warehouseStockEntries?.find(
                                (obj) => obj.warehouseId === id
                            )?.warehouseQuantity ?? 0

                        return <div className='text-right'>{quantity}</div>
                    },
                })
            )

            const updatedColumns = [
                ...baseColumns.slice(0, baseColumns.length - 1),
                ...warehouseColumns,
                baseColumns[baseColumns.length - 1],
            ]

            setColumns(updatedColumns)
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
                title='Список товаров'
                topBarElements={
                    <>
                        <CreateProductVariantDialog />
                        <FilterVariants />
                    </>
                }
                batchEditComponent={BatchEditVariantsDialog}
            />
        </>
    )
}
