import { ProductFindAll } from '@/types/entities/Product'
import { ColumnDef } from '@tanstack/react-table'
import { DisplayUploadedFile } from '../form/media/DisplayUploadedFile'
import { Badge } from '@/components/ui/badge'
import SelectHeader from '@/components/data-tables/SelectHeader'
import SelectCell from '@/components/data-tables/SelectCell'

export const productColumns: ColumnDef<ProductFindAll>[] = [
  {
    id: 'controls',
    header: ({ table }) => <SelectHeader table={table} />,
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <SelectCell row={row} />
        {row.original.media?.[0] && (
          <div className='w-24 h-24 shrink-0'>
            <DisplayUploadedFile
              id={row.original.media?.[0].id}
              className='w-full aspect-square shadow-sm'
            />
          </div>
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'Название',
    header: 'Название',
    cell: ({ row }) => {
      return <span className='font-medium'>{row.original.title}</span>
    },
  },
  {
    id: 'Артикул',
    header: 'Артикул',
    cell: ({ row }) => {
      return <span className='text-muted-foreground'>{row.original.sku}</span>
    },
  },
  {
    id: 'Теги',
    header: 'Теги',
    cell: ({ row }) => {
      return row.original.tags && row.original.tags?.length >= 1 ? (
        <Badge variant='secondary'>
          {row.original.tags.map(({ name }) => name).join(', ')}
        </Badge>
      ) : null
    },
  },
  {
    id: 'Категория',
    header: 'Категория',
    accessorFn: ({ category }) => category?.name,
  },
  {
    id: 'Бренд',
    header: 'Бренд',
    accessorFn: ({ brand }) => brand?.name,
  },
  {
    id: 'Пол',
    accessorFn: ({ gender }) =>
      gender === 'MALE'
        ? 'Мужской'
        : gender === 'FEMALE'
        ? 'Женский'
        : 'Унисекс',
  },
  {
    id: 'Сезон',
    accessorFn: ({ season }) =>
      season === 'ALL_SEASON'
        ? 'Всесезон'
        : season === 'SPRING_FALL'
        ? 'Весна-лето'
        : season === 'SUMMER'
        ? 'Лето'
        : 'Зима',
  },
  {
    id: 'Цвета',
    header: 'Цвета',
    cell: ({ row }) => {
      const colorsArray = row.original.colors?.map(({ color, colorId }) => ({
        color: color.color,
        colorId,
      }))

      if (colorsArray) {
        return (
          <div className='flex items-center gap-1'>
            {colorsArray.map(({ color, colorId }) => (
              <div
                key={colorId}
                className='h-4 w-4 rounded-full border border-input'
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        )
      }
    },
  },
  // {
  //   id: 'Полученное количество',
  //   header: 'Полученное количество',
  //   cell: ({ row }) => {
  //     const { totalReceivedQuantity } = row.original

  //     return <p className='text-end'>{totalReceivedQuantity}</p>
  //   },
  // },
  // {
  //   id: 'Количество на складах',
  //   header: 'Количество на складах',
  //   cell: ({ row }) => {
  //     const { totalWarehouseQuantity } = row.original

  //     return <p className='text-end'>{totalWarehouseQuantity}</p>
  //   },
  // },
]
