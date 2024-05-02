import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowRight, DollarSign } from 'lucide-react'
import { UseFormReturn, useWatch } from 'react-hook-form'
import {
  CashRegisterItem,
  cashRegisterOrderFormSchema,
} from '../../types/cash-register-order-form-schema'
import { CurrencyFormatter } from '@/components/ui/units'
import PaymentMethodRadioGroup from './PaymentMethodRadioGroup'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import getDiscountedPrice from '@/utils/getDiscountedPrice'
import { z } from 'zod'
import SaveButton from '@/components/forms/SaveButton'
import { AlertDestructive } from '@/components/AlertDestructive'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  onSubmit(values: z.infer<typeof cashRegisterOrderFormSchema>): void
  errorMessage?: string
  isPending: boolean
}

export default function PaymentDialog({
  form,
  onSubmit,
  errorMessage,
  isPending,
}: Props) {
  const [isOpened, setIsOpened] = useState(false)
  const items: CashRegisterItem[] = useWatch({
    control: form.control,
    name: 'items',
  })

  const paymentMethod: 'CARD' | 'CASH' | 'MIXED' = useWatch({
    control: form.control,
    name: 'paymentMethod',
  })

  const bulkSaleType: 'FIXED-AMOUNT' | 'PERCENTAGE' = useWatch({
    control: form.control,
    name: 'customBulkDiscountType',
  })

  const customBulkDiscountFixedAmount: number | undefined = useWatch({
    control: form.control,
    name: 'customBulkDiscountFixedAmount',
  })

  const customBulkDiscountPercentage: number | undefined = useWatch({
    control: form.control,
    name: 'customBulkDiscountPercentage',
  })

  const [givenCashAmount, setGivenCashAmount] = useState<string | undefined>()

  const mixedCashAmount: number | undefined = useWatch({
    control: form.control,
    name: 'totalCashAmount',
  })

  function setMixedCashAmount(value?: string) {
    form.setValue('totalCashAmount', value)
  }

  const mixedCardAmount: number | undefined = useWatch({
    control: form.control,
    name: 'totalCardAmount',
  })

  function setMixedCardAmount(value?: string) {
    form.setValue('totalCardAmount', value)
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button type='button' disabled={!items || items.length === 0}>
          <ArrowRight className='h-4 w-4 mr-2' />
          Перейти к оплате
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Оплата</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Размер</TableHead>
              <TableHead className='text-right'>Количество</TableHead>
              <TableHead className='text-right'>Цена</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(
              ({
                id,
                product,
                size,
                quantity,
                price,
                sale,
                customSaleFixedAmount,
                customSalePercentage,
                customSaleType,
              }) => (
                <TableRow key={id}>
                  <TableCell className='font-medium'>
                    {product?.title}
                  </TableCell>
                  <TableCell>{size}</TableCell>
                  <TableCell className='text-right'>{quantity ?? 1}</TableCell>
                  <TableCell className='text-right'>
                    <CurrencyFormatter
                      value={
                        customSaleType
                          ? getDiscountedPrice(
                              customSaleType,
                              getDiscountedPrice('PERCENTAGE', price, sale),
                              customSaleType === 'FIXED-AMOUNT'
                                ? customSaleFixedAmount
                                : customSalePercentage
                            )
                          : getDiscountedPrice('PERCENTAGE', price, sale)
                      }
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        <div className='flex items-center justify-between font-medium text-lg border border-input bg-background shadow-sm p-4 rounded-md'>
          <span>К оплате:</span>
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
                            getDiscountedPrice('PERCENTAGE', price, sale),
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
        <FormField
          control={form.control}
          name='paymentMethod'
          render={({ field }) => (
            <FormItem>
              <FormLabelForRequiredFields text='Способ оплаты' />
              <FormControl>
                <PaymentMethodRadioGroup field={field} />
              </FormControl>
            </FormItem>
          )}
        />
        {paymentMethod === 'CASH' && (
          <div className='flex items-center gap-2'>
            <div className='space-y-2'>
              <Label htmlFor='givenCashAmount'>Дано (грн):</Label>
              <Input
                id='givenCashAmount'
                type='number'
                placeholder='Без сдачи'
                value={givenCashAmount}
                className='h-12 text-lg'
                onChange={(e) => setGivenCashAmount(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cashAmountChange'>Сдача (грн):</Label>
              <Input
                id='cashAmountChange'
                type='number'
                className='h-12 text-lg'
                readOnly={true}
                value={(givenCashAmount
                  ? parseFloat(givenCashAmount) -
                    (items && items.length >= 1
                      ? getDiscountedPrice(
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
                                      getDiscountedPrice(
                                        'PERCENTAGE',
                                        price,
                                        sale
                                      ),
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
                        )
                      : 0)
                  : 0
                ).toFixed(2)}
              />
            </div>
          </div>
        )}
        {paymentMethod === 'MIXED' && (
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className='space-y-2'>
                <Label htmlFor='mixedCashAmount'>Наличными (грн):</Label>
                <Input
                  id='mixedCashAmount'
                  type='number'
                  value={mixedCashAmount}
                  className='h-12 text-lg'
                  onChange={(e) => {
                    const value = e.target.value

                    const leftToFillOut =
                      (items && items.length >= 1
                        ? getDiscountedPrice(
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
                                        getDiscountedPrice(
                                          'PERCENTAGE',
                                          price,
                                          sale
                                        ),
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
                          )
                        : 0) - (value ? parseFloat(value) : 0)

                    setMixedCashAmount(value)
                    setMixedCardAmount(leftToFillOut.toFixed(2).toString())
                  }}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='mixedCardAmount'>Безналичными (грн):</Label>
                <Input
                  type='number'
                  id='mixedCardAmount'
                  value={mixedCardAmount}
                  className='h-12 text-lg'
                  onChange={(e) => {
                    const value = e.target.value

                    const leftToFillOut =
                      (items && items.length >= 1
                        ? getDiscountedPrice(
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
                                        getDiscountedPrice(
                                          'PERCENTAGE',
                                          price,
                                          sale
                                        ),
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
                          )
                        : 0) - (value ? parseFloat(value) : 0)

                    setMixedCardAmount(value)
                    setMixedCashAmount(leftToFillOut.toFixed(2).toString())
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {errorMessage && errorMessage.length >= 1 && (
          <AlertDestructive text={errorMessage} />
        )}
        <SaveButton
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
          text='Оплата'
          icon={<DollarSign className='h-4 w-4 mr-2' />}
        />
      </DialogContent>
    </Dialog>
  )
}
