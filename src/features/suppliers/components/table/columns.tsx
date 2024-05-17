import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Supplier } from '@/types/entities/Supplier'
import { ColumnDef } from '@tanstack/react-table'
import SupplierActions from './SupplierActions'
import { CurrencyFormatter } from '@/components/ui/units'

export const columns: ColumnDef<Supplier>[] = [
    {
        id: 'Название',
        accessorKey: 'name',
        header: () => (
            <SortableDataTableHeader
                label='Название'
                orderByProperty='name'
                routeId='/layout/suppliers'
            />
        ),
        cell: ({ row }) => (
            <span className='font-medium'>{row.original.name}</span>
        ),
    },
    {
        id: 'Адрес',
        accessorKey: 'address',
        header: () => (
            <SortableDataTableHeader
                label='Адрес'
                orderByProperty='address'
                routeId='/layout/suppliers'
            />
        ),
    },
    {
        id: 'Контактное лицо',
        accessorKey: 'contactPerson',
        header: () => (
            <SortableDataTableHeader
                label='Контактное лицо'
                orderByProperty='contactPerson'
                routeId='/layout/suppliers'
            />
        ),
    },
    {
        id: 'Адрес електронной почты',
        accessorKey: 'email',
        header: () => (
            <SortableDataTableHeader
                label='Адрес електронной почты'
                orderByProperty='email'
                routeId='/layout/suppliers'
            />
        ),
    },
    {
        id: 'Номер телефона',
        accessorKey: 'phone',
        header: () => (
            <SortableDataTableHeader
                label='Номер телефона'
                orderByProperty='phone'
                routeId='/layout/suppliers'
            />
        ),
    },
    {
        id: 'Долг',
        header: () => <div className='text-right'>Долг</div>,
        cell: ({ row }) => {
            const { totalOutstandingBalance } = row.original

            return (
                <div className='w-full text-right'>
                    <CurrencyFormatter
                        value={
                            totalOutstandingBalance
                                ? parseFloat(totalOutstandingBalance)
                                : 0
                        }
                    />
                </div>
            )
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const { id, isArchived } = row.original

            return <SupplierActions id={id} isArchived={isArchived} />
        },
        enableSorting: false,
        enableHiding: false,
    },
]
