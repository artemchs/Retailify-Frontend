import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { CurrencyFormatter, DateFormatter } from '@/components/ui/units'
import {
  GoodsReceipt,
  paymentOptions,
} from '@/types/entities/GoodsReceipt'
import { ColumnDef } from '@tanstack/react-table'
import GoodsReceiptActions from './GoodsReceiptActions'

export const columns: ColumnDef<GoodsReceipt>[] = [
  {
    id: 'Название',
    accessorKey: 'name',
    header: () => (
      <SortableDataTableHeader
        label='Название'
        orderByProperty='name'
        routeId='/layout/goods-receipts'
      />
    ),
    cell: ({ row }) => <span className='font-medium'>{row.original.name}</span>,
  },
  {
    id: 'Дата прихода',
    accessorKey: 'goodsReceiptDate',
    header: () => (
      <SortableDataTableHeader
        label='Дата прихода'
        orderByProperty='goodsReceiptDate'
        routeId='/layout/goods-receipts'
      />
    ),
    cell: ({ row }) => <DateFormatter date={row.original.goodsReceiptDate} />,
  },
  {
    id: 'Склад',
    header: 'Склад',
    cell: ({ row }) => row.original.warehouse?.name,
  },
  {
    id: 'Поставщик',
    header: 'Поставщик',
    cell: ({ row }) => row.original.supplier?.name,
  },
  {
    id: 'Способ оплаты',
    accessorFn: (row) =>
      row.supplierInvoice?.paymentOption &&
      paymentOptions[row.supplierInvoice?.paymentOption],
  },
  {
    id: 'Общая стоимость',
    header: () => <div className='text-right'>Общая стоимость</div>,
    cell: ({ row }) => {
      const totalCost = row.original.supplierInvoice?.accountsPayable
        ? parseFloat(row.original.supplierInvoice?.accountsPayable)
        : 0

      return (
        <div className='w-full text-right'>
          <CurrencyFormatter value={totalCost} />
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, isArchived } = row.original

      return <GoodsReceiptActions id={id} isArchived={isArchived} />
    },
    enableSorting: false,
    enableHiding: false,
  },
]
