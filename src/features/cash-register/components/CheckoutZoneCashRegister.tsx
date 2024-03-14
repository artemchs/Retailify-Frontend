import { Button } from '@/components/ui/button'
import { CurrencyFormatter } from '@/components/ui/units'
import { CashRegisterRowSelectionState } from '@/pages/CashRegister'
import { X } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Control, UseFormReturn, useWatch } from 'react-hook-form'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import CustomerCombobox from '@/features/customers/components/shared/CustomerCombobox'
import { CashRegisterItem } from '../types/cash-register-order-form-schema'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
}

export default function CheckoutZone({
  form,
  control,
  rowSelection,
  setRowSelection,
}: Props & CashRegisterRowSelectionState) {
  const items: CashRegisterItem[] = useWatch({
    control,
    name: 'items',
  })

  function setSelectedRows(items: CashRegisterItem[]) {
    form.setValue('items', items)
  }

  return (
    <div className='flex flex-col gap-4 max-h-full overflow-y-auto'>
      <FormField
        control={form.control}
        name='customerId'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <CustomerCombobox field={field} form={form} />
            </FormControl>
          </FormItem>
        )}
      />
      <div className='max-h-full overflow-y-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Размер</TableHead>
              <TableHead className='text-right'>Количество</TableHead>
              <TableHead className='text-right'>Цена</TableHead>
              <TableHead className='text-right'>Убрать</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(({ id, product, size, quantity, price, sale }, i) => (
              <TableRow key={id}>
                <TableCell className='font-medium'>{product?.title}</TableCell>
                <TableCell>{size}</TableCell>
                <TableCell>
                  <div className='flex w-full gap-1 items-center justify-center'>
                    <Button
                      className='h-8 w-8'
                      size='icon'
                      variant='ghost'
                      type='button'
                      disabled={!quantity || quantity === 1}
                      onClick={() => {
                        if (quantity && quantity > 1) {
                          const newArray = [...items]
                          newArray[i] = {
                            ...newArray[i],
                            quantity: quantity - 1,
                          }
                          setSelectedRows(newArray)
                        }
                      }}
                    >
                      -
                    </Button>
                    {quantity ?? 1}
                    <Button
                      className='h-8 w-8'
                      size='icon'
                      variant='ghost'
                      type='button'
                      onClick={() => {
                        const newArray = [...items]
                        newArray[i] = {
                          ...newArray[i],
                          quantity: (quantity ?? 1) + 1,
                        }
                        setSelectedRows(newArray)
                      }}
                    >
                      +
                    </Button>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <CurrencyFormatter value={price * (1 - (sale ?? 0))} />
                </TableCell>
                <TableCell>
                  <div className='w-full flex items-center justify-end'>
                    <Button
                      size='icon'
                      className='h-8 w-8'
                      variant='ghost'
                      type='button'
                      onClick={() => {
                        delete rowSelection[id]
                        setRowSelection({ ...rowSelection })
                      }}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between font-medium text-lg'>
        <span>Общая сумма:</span>
        {items && items.length >= 1 ? (
          <CurrencyFormatter
            value={items
              .map(
                ({ price, quantity, sale }) =>
                  price * (1 - (sale ?? 0)) * (quantity ?? 1)
              )
              .reduce((prev, curr) => prev + curr)}
          />
        ) : (
          <CurrencyFormatter value={0} />
        )}
      </div>
    </div>
  )
}
