import SelectCell from '@/components/data-tables/SelectCell'
import SelectHeader from '@/components/data-tables/SelectHeader'
import { CurrencyFormatter } from '@/components/ui/units'
import { DisplayUploadedFile } from '@/features/products/components/shared/form/media/DisplayUploadedFile'
import { Variant } from '@/types/entities/Variant'
import getDiscountedPrice from '@/utils/getDiscountedPrice'
import { ColumnDef } from '@tanstack/react-table'
import VariantActions from './VariantActions'

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
      <div className='flex gap-4 items-center'>
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
    id: 'Артикул модели товара',
    header: 'Артикул модели товара',
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.original.product?.sku}</span>
    ),
  },
  {
    id: 'Цена без скидки',
    header: () => 'Цена без скидки',
    cell: ({ row }) => {
      const price = row.original.price

      return <CurrencyFormatter value={price} />
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
    id: 'Размер',
    header: () => 'Размер',
    cell: ({ row }) => {
      return <span>{row.original.size}</span>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, isArchived, productId } = row.original

      return productId ? (
        <VariantActions
          productId={productId}
          id={id}
          isArchived={isArchived}
        />
      ) : null
    },
    enableSorting: false,
    enableHiding: false,
  },
]
