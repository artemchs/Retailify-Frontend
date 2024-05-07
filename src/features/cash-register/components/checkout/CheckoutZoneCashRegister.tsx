import { Button } from '@/components/ui/button'
import { CurrencyFormatter, PercentageFormatter } from '@/components/ui/units'
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
import { CashRegisterItem } from '../../types/cash-register-order-form-schema'
import AddCustomSaleForItemDialog from './AddCustomSaleForItemDialog'
import getDiscountedPrice from '@/utils/getDiscountedPrice'

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

  const bulkSaleType: 'FIXED-AMOUNT' | 'PERCENTAGE' = useWatch({
    control,
    name: 'customBulkDiscountType',
  })

  const customBulkDiscountFixedAmount: number | undefined = useWatch({
    control,
    name: 'customBulkDiscountFixedAmount',
  })

  const customBulkDiscountPercentage: number | undefined = useWatch({
    control,
    name: 'customBulkDiscountPercentage',
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
              <TableHead>Товар</TableHead>
              <TableHead className='text-right'>Количество</TableHead>
              <TableHead className='text-right'>Цена до скидки</TableHead>
              <TableHead className='text-right'>Цена со скидкой</TableHead>
              <TableHead className='text-right'>Скидка</TableHead>
              <TableHead className='text-right'>Еквивалент</TableHead>
              <TableHead className='text-right w-8'>Убрать</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(
              (
                {
                  id,
                  product,
                  size,
                  quantity,
                  price,
                  sale,
                  customSaleFixedAmount,
                  customSalePercentage,
                  customSaleType,
                },
                i
              ) => (
                <TableRow key={id}>
                  <TableCell className='font-medium min-w-36'>
                    {product?.title} {product?.sku} {size}
                  </TableCell>
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
                    <CurrencyFormatter
                      value={getDiscountedPrice('FIXED-AMOUNT', price, sale)}
                    />
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex flex-col min-w-36'>
                      <CurrencyFormatter
                        value={
                          getDiscountedPrice(
                            customSaleType,
                            getDiscountedPrice('FIXED-AMOUNT', price, sale),
                            customSaleType === 'FIXED-AMOUNT'
                              ? customSaleFixedAmount
                              : customSalePercentage
                          ) * (quantity ?? 1)
                        }
                      />
                      {quantity && quantity > 1 && (
                        <div className='text-muted-foreground'>
                          <CurrencyFormatter
                            value={getDiscountedPrice(
                              customSaleType,
                              getDiscountedPrice('FIXED-AMOUNT', price, sale),
                              customSaleType === 'FIXED-AMOUNT'
                                ? customSaleFixedAmount
                                : customSalePercentage
                            )}
                          />{' '}
                          <span>за 1 шт.</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='text-right'>
                      <AddCustomSaleForItemDialog
                        priceWithoutCustomSale={getDiscountedPrice(
                          'FIXED-AMOUNT',
                          price,
                          sale
                        )}
                        form={form}
                        id={id}
                        quantity={quantity}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    {customSaleType &&
                      (customSaleFixedAmount || customSalePercentage) && (
                        <CalculateSaleEquivalent
                          originalPrice={getDiscountedPrice(
                            'FIXED-AMOUNT',
                            price,
                            sale
                          )}
                          sale={
                            (customSaleType === 'FIXED-AMOUNT'
                              ? customSaleFixedAmount
                              : customSalePercentage) ?? 0
                          }
                          saleType={customSaleType}
                        />
                      )}
                  </TableCell>
                  <TableCell className='w-8'>
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
              )
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between font-medium text-lg'>
        <span>Общая сумма:</span>
        {items && items.length >= 1 ? (
          <CurrencyFormatter
            value={getDiscountedPrice(
              bulkSaleType,
              items && items.length >= 1
                ? items
                    .map(
                      ({
                        price,
                        quantity,
                        sale,
                        customSaleFixedAmount,
                        customSalePercentage,
                        customSaleType,
                      }) =>
                        getDiscountedPrice(
                          customSaleType,
                          getDiscountedPrice('FIXED-AMOUNT', price, sale),
                          customSaleType === 'FIXED-AMOUNT'
                            ? customSaleFixedAmount
                            : customSalePercentage
                        ) * (quantity ?? 1)
                    )
                    .reduce((prev, curr) => prev + curr)
                : 0,
              bulkSaleType === 'FIXED-AMOUNT'
                ? customBulkDiscountFixedAmount ?? 0
                : customBulkDiscountPercentage ?? 0
            )}
          />
        ) : (
          <CurrencyFormatter value={0} />
        )}
      </div>
    </div>
  )
}

function CalculateSaleEquivalent({
  sale,
  saleType,
  originalPrice,
}: {
  saleType: 'FIXED-AMOUNT' | 'PERCENTAGE'
  sale: number
  originalPrice: number
}) {
  if (saleType === 'FIXED-AMOUNT') {
    const percentageValue = sale / originalPrice

    return <PercentageFormatter value={percentageValue} />
  } else if (saleType === 'PERCENTAGE') {
    const fixedAmountValue = (sale / 100) * originalPrice // That's math my boy

    return <CurrencyFormatter value={fixedAmountValue} />
  } else {
    return <></>
  }
}
