import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CurrencyFormatter } from '@/components/ui/units'
import { ProductFindAll } from '@/types/entities/Product'
import { Row } from '@tanstack/react-table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Badge } from '@/components/ui/badge'
import getDiscountedPrice from '@/utils/getDiscountedPrice'

type Props = {
  row: Row<ProductFindAll>
}

export default function RenderProductSubComponent({ row }: Props) {
  const variants = row.original.variants

  return (
    <div className='ml-14'>
      <Table>
        <TableHeader>
          <TableHead>Размер</TableHead>
          <TableHead className='text-right'>Цена без скидки</TableHead>
          <TableHead className='text-right'>Скидка</TableHead>
          <TableHead className='text-right'>Цена продажи</TableHead>
          <TableHead className='text-right'>Полученное количество</TableHead>
          <TableHead className='text-right'>Количество на складах</TableHead>
        </TableHeader>
        <TableBody>
          {variants?.map(
            ({
              id,
              price,
              sale,
              size,
              totalReceivedQuantity,
              totalWarehouseQuantity,
              warehouseStockEntries,
            }) => (
              <TableRow key={id}>
                <TableCell>{size}</TableCell>
                <TableCell className='text-right'>
                  <CurrencyFormatter value={price} />
                </TableCell>
                <TableCell className='text-right'>
                  <CurrencyFormatter value={sale ? sale : 0} />
                </TableCell>
                <TableCell className='text-right'>
                  <CurrencyFormatter
                    value={getDiscountedPrice('FIXED-AMOUNT', price, sale)}
                  />
                </TableCell>
                <TableCell className='text-right'>
                  {totalReceivedQuantity} шт
                </TableCell>
                <TableCell className='flex justify-end'>
                  <ViewWarehouseStockEntries
                    entries={warehouseStockEntries}
                    totalWarehouseQuantity={totalWarehouseQuantity}
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function ViewWarehouseStockEntries({
  entries,
  totalWarehouseQuantity,
}: {
  entries: {
    warehouseQuantity: number
    warehouse: {
      id: string
      name: string
    } | null
  }[]
  totalWarehouseQuantity: number
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge variant='secondary' className='cursor-pointer'>
          {totalWarehouseQuantity} шт
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Количество товара на разных складах</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Склад</TableHead>
              <TableHead className='text-right'>Количество</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map(({ warehouse, warehouseQuantity }) => (
              <TableRow key={warehouse?.id}>
                <TableCell>{warehouse?.name}</TableCell>
                <TableCell className='text-right'>
                  {warehouseQuantity} шт
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
