import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { CurrencyFormatter, DateFormatter } from '@/components/ui/units'
import { CashierShift } from '@/types/entities/CashierShift'
import { ColumnDef } from '@tanstack/react-table'
import CashierShiftActions from './CashierShiftActions'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import DisplayCashier from './DisplayCashier'

export const columns: ColumnDef<CashierShift>[] = [
  {
    id: 'Название',
    header: () => (
      <SortableDataTableHeader
        label='Название'
        orderByProperty='name'
        routeId='/layout/points-of-sale/$pointOfSaleId/shifts'
      />
    ),
    cell: ({ row }) => {
      return <span className='font-medium'>{row.original.name}</span>
    },
  },
  {
    id: 'Кассир',
    header: 'Кассир',
    cell: ({ row }) =>
      row.original.cashierId && (
        <DisplayCashier cashierId={row.original.cashierId} />
      ),
  },
  {
    id: 'Статус',
    header: 'Статус',
    cell: ({ row }) => (
      <Badge
        variant='outline'
        className={cn(
          row.original.isOpened && 'text-green-600 border-green-600'
        )}
      >
        {row.original.isOpened ? 'Открыта' : 'Закрыта'}
      </Badge>
    ),
  },
  {
    id: 'Дата открытия',
    header: 'Дата открытия',
    cell: ({ row }) => (
      <DateFormatter withPreciseTime={true} date={row.original.createdAt} />
    ),
  },
  {
    id: 'Дата закрытия',
    header: 'Дата закрытия',
    cell: ({ row }) =>
      row.original.closedAt && (
        <DateFormatter withPreciseTime={true} date={row.original.closedAt} />
      ),
  },
  {
    id: 'Начальная сумма в кассе',
    header: () => <div className='text-right'>Начальная сумма в кассе</div>,
    cell: ({ row }) => (
      <div className='w-full text-right'>
        <CurrencyFormatter
          value={parseFloat(row.original.startingCashBalance)}
        />
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, isOpened } = row.original

      return <CashierShiftActions id={id} isOpened={isOpened} />
    },
    enableSorting: false,
    enableHiding: false,
  },
]
