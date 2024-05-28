import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { CurrencyFormatter, DateFormatter } from '@/components/ui/units'
import { FinancialTransactionFindAll } from '@/types/entities/FinancialTransaction'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from 'lucide-react'
import ViewComment from './ViewComment'
import { financialTransactionTypes } from '../shared/constants'
import FinancialTransactionActions from './FinancialTransactionActions'

export const columns: ColumnDef<FinancialTransactionFindAll>[] = [
    {
        id: 'Дата',
        header: () => (
            <SortableDataTableHeader
                label='Дата'
                orderByProperty='date'
                routeId='/layout/financial-transactions'
            />
        ),
        cell: ({ row }) => {
            const { date } = row.original

            return <DateFormatter date={date} withPreciseTime />
        },
    },
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
                row.original.direction === 'DEBIT' ? (
                    <ArrowUp className='h-4 w-4 mr-2 text-green-600' />
                ) : (
                    <ArrowDown className='h-4 w-4 mr-2 text-destructive' />
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
        id: 'Описание',
        header: 'Описание',
        cell: ({ row }) => {
            const { type, customOperation } = row.original

            if (type !== 'OTHER') {
                return (
                    <span>
                        {
                            financialTransactionTypes.find(
                                (obj) => obj.value === type
                            )?.label
                        }
                    </span>
                )
            } else {
                return <span>{customOperation?.name}</span>
            }
        },
    },
    {
        id: 'Комметнарий',
        header: 'Комметнарий',
        cell: ({ row }) => {
            const { comment } = row.original

            return <ViewComment comment={comment} />
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const { id, isManual } = row.original

            return <FinancialTransactionActions id={id} isManual={isManual} />
        },
        enableSorting: false,
        enableHiding: false,
    },
]
