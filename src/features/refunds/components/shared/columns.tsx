import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { CurrencyFormatter, DateFormatter } from '@/components/ui/units'
import { ColumnDef } from '@tanstack/react-table'
import { Refund } from '@/types/entities/Refund'

export const columns: ColumnDef<Refund>[] = [
    {
        id: 'Название',
        header: () => (
            <SortableDataTableHeader
                label='Название'
                orderByProperty='name'
                routeId='/layout/refunds'
            />
        ),
        cell: ({ row }) => {
            return <span className='font-medium'>{row.original.name}</span>
        },
    },
    {
        id: 'Дата',
        accessorKey: 'createdAt',
        header: () => (
            <SortableDataTableHeader
                label='Дата'
                orderByProperty='createdAt'
                routeId='/layout/refunds'
            />
        ),
        cell: ({ row }) => (
            <DateFormatter date={row.original.createdAt} withPreciseTime />
        ),
    },
    {
        id: 'Способ оплаты',
        header: () => <div>Способ оплаты</div>,
        cell: ({ row }) => {
            const methodName = {
                CASH: 'Наличными',
                CARD: 'Безналичными',
                MIXED: 'Смешанный',
            }

            const name =
                row.original.order?.invoice?.paymentMethod &&
                methodName[row.original.order?.invoice?.paymentMethod]

            return <div>{name}</div>
        },
    },
    {
        id: 'Сумма',
        header: () => <div className='text-right'>Сумма</div>,
        cell: ({ row }) => (
            <CurrencyFormatter
                value={
                    row.original.amount ? parseFloat(row.original.amount) : 0
                }
            />
        ),
    },
    {
        id: 'Касса',
        header: () => <div>Касса</div>,
        cell: ({ row }) => {
            const name = row.original.shift?.pointOfSale?.name

            return <div>{name}</div>
        },
    },
    {
        id: 'Кассир',
        header: () => <div>Кассир</div>,
        cell: ({ row }) => {
            const fullName = row.original.shift?.cashier?.fullName

            return <div>{fullName}</div>
        },
    },
    {
        id: 'Админ',
        header: () => <div>Админ</div>,
        cell: ({ row }) => {
            return <div>{row.original.admin?.fullName}</div>
        },
    },
    {
        id: 'Клиент',
        header: () => <div>Клиент</div>,
        cell: ({ row }) => {
            const firstName = row.original.order?.customer?.firstName
            const lastName = row.original.order?.customer?.lastName

            return <div>{[firstName, lastName].join(' ')}</div>
        },
    },
]
