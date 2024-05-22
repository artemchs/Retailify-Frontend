import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { CurrencyFormatter, DateFormatter } from '@/components/ui/units'
import { FinancialTransactionFindAll } from '@/types/entities/FinancialTransaction'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from 'lucide-react'

export const columns: ColumnDef<FinancialTransactionFindAll>[] = [
    {
        id: 'Сумма',
        header: () => (
            <SortableDataTableHeader
                label='Сумма'
                orderByProperty='amount'
                routeId='/layout/financial-transactions'
            />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.original.amount)
            const icon =
                row.original.direction === 'CREDIT' ? (
                    <ArrowUp className='h-4 w-4 mr-2 text-destructive' />
                ) : (
                    <ArrowDown className='h-4 w-4 mr-2 text-primary' />
                )

            return (
                <div className='flex items-center gap-1'>
                    {icon}
                    <CurrencyFormatter value={amount} />
                </div>
            )
        },
    },
    {
        id: 'Дата',
        header: () => (
            <SortableDataTableHeader
                label='Дата'
                orderByProperty='createdAt'
                routeId='/layout/financial-transactions'
            />
        ),
        cell: ({ row }) => {
            const { createdAt } = row.original

            return <DateFormatter date={createdAt} withPreciseTime />
        },
    },
]
