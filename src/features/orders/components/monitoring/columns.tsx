import { Button } from '@/components/ui/button'
import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { CurrencyFormatter, DateFormatter } from '@/components/ui/units'
import { Order } from '@/types/entities/Order'
import { ColumnDef } from '@tanstack/react-table'
import CashierOrderDialog from '../cash-register/CashierOrderDialog'

export const columns: ColumnDef<Order>[] = [
    {
        id: 'Название',
        header: () => (
            <SortableDataTableHeader
                label='Название'
                orderByProperty='name'
                routeId='/layout/orders'
            />
        ),
        cell: ({ row }) => {
            return (
                <CashierOrderDialog
                    id={row.original.id}
                    trigger={
                        <Button variant='link' className='font-medium'>
                            {row.original.name}
                        </Button>
                    }
                />
            )
        },
    },
    {
        id: 'Дата',
        accessorKey: 'createdAt',
        header: () => (
            <SortableDataTableHeader
                label='Дата'
                orderByProperty='createdAt'
                routeId='/layout/orders'
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
                row.original.invoice?.paymentMethod &&
                methodName[row.original.invoice.paymentMethod]

            return <div>{name}</div>
        },
    },
    {
        id: 'Сумма наличными',
        header: () => <div className='text-right'>Сумма наличными</div>,
        cell: ({ row }) => (
            <CurrencyFormatter
                value={
                    row.original.invoice?.totalCashAmount
                        ? parseFloat(row.original.invoice?.totalCashAmount)
                        : 0
                }
            />
        ),
    },
    {
        id: 'Сумма безналичными',
        header: () => <div className='text-right'>Сумма безналичными</div>,
        cell: ({ row }) => (
            <CurrencyFormatter
                value={
                    row.original.invoice?.totalCardAmount
                        ? parseFloat(row.original.invoice?.totalCardAmount)
                        : 0
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
        id: 'Клиент',
        header: () => <div>Клиент</div>,
        cell: ({ row }) => {
            const firstName = row.original.customer?.firstName
            const lastName = row.original.customer?.lastName

            return <div>{[firstName, lastName].join(' ')}</div>
        },
    },
]
