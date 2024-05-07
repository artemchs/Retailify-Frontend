import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { CurrencyFormatter, PercentageFormatter } from '@/components/ui/units'
import getDiscountedPrice from '@/utils/getDiscountedPrice'
import { Percent, Receipt, Save } from 'lucide-react'
import { useState } from 'react'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { CashRegisterItem } from '../../types/cash-register-order-form-schema'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { FaMoneyBill } from 'react-icons/fa6'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function AddCustomBulkDiscountDialog({ form }: Props) {
  const [isOpened, setIsOpened] = useState(false)
  const [saleType, setSaleType] = useState<'FIXED-AMOUNT' | 'PERCENTAGE'>(
    'FIXED-AMOUNT'
  )
  const [inputValue, setInputValue] = useState(0)

  const items: CashRegisterItem[] = useWatch({
    control: form.control,
    name: 'items',
  })

  function setCustomBulkDiscountType(value: 'FIXED-AMOUNT' | 'PERCENTAGE') {
    form.setValue('customBulkDiscountType', value)
  }

  const handleSubmit = () => {
    setIsOpened(false)
    setCustomBulkDiscountType(saleType)
    if (saleType === 'FIXED-AMOUNT') {
      form.setValue('customBulkDiscountFixedAmount', inputValue ?? 0)
    } else {
      form.setValue('customBulkDiscountPercentage', inputValue ?? 0)
    }
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant='secondary' disabled={items.length === 0}>
          {inputValue ? (
            <div className='flex gap-1 items-center'>
              Скидка:
              {saleType === 'FIXED-AMOUNT' ? (
                <CurrencyFormatter value={inputValue ?? 0} />
              ) : (
                <PercentageFormatter value={inputValue / 100 ?? 0} />
              )}
            </div>
          ) : (
            <>
              <Receipt className='h-4 w-4 mr-2' />
              Скидка на чек
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Добавить скидку на чек</DialogTitle>
          <DialogDescription>
            Это действие добавляет скидку на весь чек.
          </DialogDescription>
        </DialogHeader>
        <div className='flex gap-2 items-center'>
          <Input
            type='number'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.valueAsNumber)}
          />
          <ToggleGroup
            type='single'
            variant='outline'
            value={saleType}
            onValueChange={(value: 'FIXED-AMOUNT' | 'PERCENTAGE') =>
              setSaleType(value)
            }
          >
            <ToggleGroupItem value='FIXED-AMOUNT'>
              <FaMoneyBill className='h-4 w-4' />
            </ToggleGroupItem>
            <ToggleGroupItem value='PERCENTAGE'>
              <Percent className='h-4 w-4' />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className='p-4 mt-4 border border-input shadow-sm rounded-md flex items-center justify-between font-medium text-lg'>
          <span>Цена после скидки:</span>
          <span>
            <CurrencyFormatter
              value={getDiscountedPrice(
                saleType,
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
                inputValue ?? 0
              )}
            />
          </span>
        </div>
        <DialogFooter className='mt-4'>
          <Button type='button' onClick={handleSubmit}>
            <Save className='h-4 w-4 mr-2' />
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
