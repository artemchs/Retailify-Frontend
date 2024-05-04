import SelectCell from '@/components/data-tables/SelectCell'
import SelectHeader from '@/components/data-tables/SelectHeader'
import { CurrencyFormatter } from '@/components/ui/units'
import { DisplayUploadedFile } from '@/features/products/components/shared/form/media/DisplayUploadedFile'
import { Variant } from '@/types/entities/Variant'
import getDiscountedPrice from '@/utils/getDiscountedPrice'
import { ColumnDef } from '@tanstack/react-table'
import VariantActions from './VariantActions'
import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'

export const columns: ColumnDef<Variant>[] = [
  {
    id: 'select',
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => <SelectHeader table={table} />,
    cell: ({ row }) => <SelectCell row={row} />,
  },
  {
    id: 'Модель товара',
    header: 'Модель товара',
    cell: ({ row }) => (
      <div className='flex gap-4 items-center min-w-80'>
        {row.original.product?.media?.[0] && (
          <div className='w-24 h-24 shrink-0'>
            <DisplayUploadedFile
              id={row.original.product?.media?.[0].id}
              className='w-full aspect-square shadow-sm'
            />
          </div>
        )}
        <span className='font-medium'>{row.original.product?.title}</span>
      </div>
    ),
  },
  {
    id: 'Размер',
    header: () => (
      <SortableDataTableHeader
        label='Размер'
        orderByProperty='size'
        routeId='/layout/product-variants'
      />
    ),
    cell: ({ row }) => {
      return <span>{row.original.size}</span>
    },
  },
  {
    id: 'Артикул магазин',
    header: () => (
      <SortableDataTableHeader
        label='Артикул магазин'
        orderByProperty='sku'
        routeId='/layout/product-variants'
      />
    ),
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.original.product?.sku}</span>
    ),
  },
  {
    id: 'Артикул родной',
    header: () => (
      <SortableDataTableHeader
        label='Артикул родной'
        orderByProperty='supplierSku'
        routeId='/layout/product-variants'
      />
    ),
    cell: ({ row }) => (
      <span className='text-muted-foreground'>
        {row.original.product?.supplierSku}
      </span>
    ),
  },
  {
    id: 'Штрих-код',
    header: () => (
      <SortableDataTableHeader
        label='Штрих-код'
        orderByProperty='barcode'
        routeId='/layout/product-variants'
      />
    ),
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.original.barcode}</span>
    ),
  },
  {
    id: 'Цена без скидки',
    header: () => (
      <SortableDataTableHeader
        label='Цена без скидки'
        orderByProperty='price'
        routeId='/layout/product-variants'
      />
    ),
    cell: ({ row }) => {
      const price = row.original.price

      return <CurrencyFormatter value={price} />
    },
  },
  {
    id: 'Скидка',
    header: () => (
      <SortableDataTableHeader
        label='Скидка'
        orderByProperty='sale'
        routeId='/layout/product-variants'
      />
    ),
    cell: ({ row }) => {
      const sale = row.original.sale

      return <CurrencyFormatter value={sale ?? 0} />
    },
  },
  {
    id: 'Цена со скидкой',
    header: () => 'Цена со скидкой',
    cell: ({ row }) => {
      const price = row.original.price
      const sale = row.original.sale

      return (
        <CurrencyFormatter
          value={getDiscountedPrice('FIXED-AMOUNT', price, sale)}
        />
      )
    },
  },
  {
    id: 'Полученое кол-во',
    header: () => (
      <SortableDataTableHeader
        label='Полученое кол-во (шт)'
        orderByProperty='totalReceivedQuantity'
        routeId='/layout/product-variants'
      />
    ),
    cell: ({ row }) => {
      const { totalReceivedQuantity } = row.original

      return <div className='text-right'>{totalReceivedQuantity}</div>
    },
  },
  {
    id: 'Кол-во на складах',
    header: () => (
      <SortableDataTableHeader
        label='Кол-во на складах (шт)'
        orderByProperty='totalWarehouseQuantity'
        routeId='/layout/product-variants'
      />
    ),
    cell: ({ row }) => {
      const { totalWarehouseQuantity } = row.original

      return <div className='text-right'>{totalWarehouseQuantity}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, isArchived, productId } = row.original

      return productId ? (
        <VariantActions productId={productId} id={id} isArchived={isArchived} />
      ) : null
    },
    enableSorting: false,
    enableHiding: false,
  },
]
