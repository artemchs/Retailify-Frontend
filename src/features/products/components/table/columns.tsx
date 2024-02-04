import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Product } from '@/types/entities/Product'
import { ColumnDef } from '@tanstack/react-table'
import RenderCollection from './RenderCollection'
import RenderBrand from './RenderBrand'

export const columns: ColumnDef<Product>[] = [
  {
    id: 'Название',
    header: () => (
      <SortableDataTableHeader
        label='Название'
        orderByProperty='name'
        routeId='/layout/products'
      />
    ),
    cell: ({ row }) => {
      return <span className='font-medium'>{row.original.title}</span>
    },
  },
  {
    id: 'Коллекция',
    cell: ({ row }) => {
      const { collectionId } = row.original

      if (collectionId) {
        return <RenderCollection id={collectionId} />
      }
    },
  },
  {
    id: 'Бренд',
    cell: ({ row }) => {
      const { brandId } = row.original

      if (brandId) {
        return <RenderBrand id={brandId} />
      }
    },
  },
  {
    id: 'Полученное количество',
    header: () => (
      <SortableDataTableHeader
        label='Полученное количество'
        orderByProperty='totalReceivedQuantity'
        routeId='/layout/products'
      />
    ),
    cell: ({ row }) => {
      const { totalReceivedQuantity } = row.original

      return <span>{totalReceivedQuantity}</span>
    },
  },
  {
    id: 'Количество на складах',
    header: () => (
      <SortableDataTableHeader
        label='Количество на складах'
        orderByProperty='totalWarehouseQuantity'
        routeId='/layout/products'
      />
    ),
    cell: ({ row }) => {
      const { totalWarehouseQuantity } = row.original

      return <span>{totalWarehouseQuantity}</span>
    },
  },
]
