import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { ProductFindAll } from '@/types/entities/Product'
import { ColumnDef } from '@tanstack/react-table'
import { DisplayUploadedFile } from '../shared/form/media/DisplayUploadedFile'
import ProductActions from './ProductActions'
import { Badge } from '@/components/ui/badge'
import SelectHeader from '@/components/data-tables/SelectHeader'
import SelectCell from '@/components/data-tables/SelectCell'

export const columns: ColumnDef<ProductFindAll>[] = [
    {
        id: 'select',
        enableHiding: false,
        enableSorting: false,
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        id: 'Модель',
        header: () => (
            <SortableDataTableHeader
                label='Модель'
                orderByProperty='title'
                routeId='/layout/products'
            />
        ),
        cell: ({ row }) => {
            return (
                <div className='flex items-center gap-2 min-w-96'>
                    {row.original.media?.[0] && (
                        <div className='w-24 h-24 shrink-0'>
                            <DisplayUploadedFile
                                id={row.original.media?.[0].id}
                                className='w-full aspect-square shadow-sm'
                            />
                        </div>
                    )}
                    <span className='font-medium'>{row.original.title}</span>
                </div>
            )
        },
    },
    {
        id: 'Артикул',
        header: () => (
            <SortableDataTableHeader
                label='Артикул'
                orderByProperty='sku'
                routeId='/layout/products'
            />
        ),
        cell: ({ row }) => {
            return (
                <span className='text-muted-foreground'>
                    {row.original.sku}
                </span>
            )
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
            const colorsArray = row.original.colors?.map(
                ({ color, colorId }) => ({
                    color: color.color,
                    colorId,
                })
            )

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
    {
        id: 'Полученное количество',
        header: () => (
            <div className='flex justify-end'>
                <SortableDataTableHeader
                    label='Полученное количество'
                    orderByProperty='totalReceivedQuantity'
                    routeId='/layout/products'
                />
            </div>
        ),
        cell: ({ row }) => {
            const { totalReceivedQuantity } = row.original

            return <p className='text-end'>{totalReceivedQuantity}</p>
        },
    },
    {
        id: 'Количество на складах',
        header: () => (
            <div className='flex justify-end'>
                <SortableDataTableHeader
                    label='Количество на складах'
                    orderByProperty='totalWarehouseQuantity'
                    routeId='/layout/products'
                />
            </div>
        ),
        cell: ({ row }) => {
            const { totalWarehouseQuantity } = row.original

            return <p className='text-end'>{totalWarehouseQuantity}</p>
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const { id, isArchived } = row.original

            return <ProductActions id={id} isArchived={isArchived} />
        },
        enableSorting: false,
        enableHiding: false,
    },
]
