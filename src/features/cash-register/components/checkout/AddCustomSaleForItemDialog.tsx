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
import { Percent, Save } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { CurrencyFormatter, PercentageFormatter } from '@/components/ui/units'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { CashRegisterItem } from '../../types/cash-register-order-form-schema'
import getDiscountedPrice from '@/utils/getDiscountedPrice'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { FaMoneyBill } from 'react-icons/fa6'

type Props = {
  priceWithoutCustomSale: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  id: string
  quantity: number
}

export default function AddCustomSaleForItemDialog({
  priceWithoutCustomSale,
  form,
  id,
  quantity,
}: Props) {
  const [isOpened, setIsOpened] = useState(false)
  const [saleType, setSaleType] = useState<'FIXED-AMOUNT' | 'PERCENTAGE'>(
    'FIXED-AMOUNT'
  )
  const [inputValue, setInputValue] = useState(0)

  const items: CashRegisterItem[] = useWatch({
    control: form.control,
    name: 'items',
  })

  const handleSubmit = () => {
    setIsOpened(false)
    const newArray = [...items]
    const index = newArray.findIndex((obj) => obj.id === id)
    if (saleType === 'FIXED-AMOUNT') {
      newArray[index] = {
        ...newArray[index],
        customSaleFixedAmount: inputValue ?? 0,
        customSalePercentage: 0,
        customSaleType: saleType,
      }
    } else {
      newArray[index] = {
        ...newArray[index],
        customSalePercentage: inputValue ?? 0,
        customSaleFixedAmount: 0,
        customSaleType: saleType,
      }
    }
    form.setValue('items', newArray)
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button
          className='text-xs min-w-36'
          size='sm'
          variant='outline'
          type='button'
        >
          {inputValue ? (
            saleType === 'FIXED-AMOUNT' ? (
              <div className='flex flex-col text-end'>
                <CurrencyFormatter value={inputValue * (quantity ?? 1) ?? 0} />
                {quantity && quantity > 1 && (
                  <div className='text-muted-foreground'>
                    <CurrencyFormatter value={inputValue ?? 0} />{' '}
                    <span>за 1 шт.</span>
                  </div>
                )}
              </div>
            ) : (
              <PercentageFormatter value={inputValue / 100 ?? 0} />
            )
          ) : (
            <>
              <Percent className='h-4 w-4 mr-2' />
              Скидка
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Добавить скидку на товар</DialogTitle>
          <DialogDescription>
            Эта скидка будет применяться к каждой единице этого товара.
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
              value={
                inputValue
                  ? getDiscountedPrice(
                      saleType,
                      priceWithoutCustomSale,
                      inputValue
                    )
                  : priceWithoutCustomSale
              }
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
