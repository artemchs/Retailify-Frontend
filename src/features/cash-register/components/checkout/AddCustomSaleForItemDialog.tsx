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
import { Coins, Percent, Save } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { CurrencyFormatter } from '@/components/ui/units'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { CashRegisterItem } from '../../types/cash-register-order-form-schema'
import getDiscountedPrice from '@/utils/getDiscountedPrice'

type Props = {
  priceWithoutCustomSale: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  id: string
}

export default function AddCustomSaleForItemDialog({
  priceWithoutCustomSale,
  form,
  id,
}: Props) {
  const [isOpened, setIsOpened] = useState(false)
  const [tabsValue, setTabsValue] = useState<'FIXED-AMOUNT' | 'PERCENTAGE'>(
    'FIXED-AMOUNT'
  )
  const [fixedAmountInputValue, setFixedAmountInputValue] = useState('')
  const [percentageInputValue, setPercentageInputValue] = useState('')

  const items: CashRegisterItem[] = useWatch({
    control: form.control,
    name: 'items',
  })

  const handleSubmit = () => {
    setIsOpened(false)
    const newArray = [...items]
    const index = newArray.findIndex((obj) => obj.id === id)
    if (tabsValue === 'FIXED-AMOUNT') {
      newArray[index] = {
        ...newArray[index],
        customSaleFixedAmount: fixedAmountInputValue
          ? parseFloat(fixedAmountInputValue)
          : 0,
        customSalePercentage: 0,
        customSaleType: tabsValue,
      }
      setPercentageInputValue('')
    } else {
      newArray[index] = {
        ...newArray[index],
        customSalePercentage: percentageInputValue
          ? parseFloat(percentageInputValue)
          : 0,
        customSaleFixedAmount: 0,
        customSaleType: tabsValue,
      }
      setFixedAmountInputValue('')
    }
    form.setValue('items', newArray)
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button className='h-8 text-xs' variant='ghost' type='button'>
          <Percent className='h-4 w-4 mr-2' />
          Скидка
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить скидку на товар</DialogTitle>
          <DialogDescription>
            Эта скидка будет применяться к каждой единице этого товара.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          value={tabsValue}
          onValueChange={(value) => {
            if (value === 'FIXED-AMOUNT' || value === 'PERCENTAGE') {
              setTabsValue(value)
            }
          }}
        >
          <TabsList className='w-full'>
            <TabsTrigger
              value='FIXED-AMOUNT'
              className='w-full flex items-center gap-2'
            >
              <Coins className='h-4 w-4' />В деньгах
            </TabsTrigger>
            <TabsTrigger
              value='PERCENTAGE'
              className='w-full flex items-center gap-2'
            >
              <Percent className='h-4 w-4' />В процентах
            </TabsTrigger>
          </TabsList>
          <TabsContent value='FIXED-AMOUNT'>
            <div className='space-y-2'>
              <Label htmlFor='sale-fixed-amount'>Скидка (грн):</Label>
              <div className='w-full relative'>
                <Coins className='h-4 w-4 text-muted-foreground absolute top-0 bottom-0 my-auto left-3 pointer-events-none' />
                <Input
                  id='sale-fixed-amount'
                  type='number'
                  placeholder='Скидка в деньгах'
                  className='pl-8'
                  autoFocus={true}
                  value={fixedAmountInputValue}
                  onChange={(e) => setFixedAmountInputValue(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value='PERCENTAGE'>
            <div className='space-y-2'>
              <Label htmlFor='sale-percentage'>Скидка (%):</Label>
              <div className='w-full relative'>
                <Percent className='h-4 w-4 text-muted-foreground absolute top-0 bottom-0 my-auto left-3 pointer-events-none' />
                <Input
                  id='sale-percentage'
                  type='number'
                  placeholder='Скидка в процентах'
                  className='pl-8'
                  autoFocus={true}
                  value={percentageInputValue}
                  onChange={(e) => setPercentageInputValue(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className='p-4 mt-4 border border-input shadow-sm rounded-md flex items-center justify-between font-medium text-lg'>
          <span>Цена после скидки:</span>
          <span>
            <CurrencyFormatter
              value={getDiscountedPrice(
                tabsValue,
                priceWithoutCustomSale,
                tabsValue === 'FIXED-AMOUNT'
                  ? fixedAmountInputValue
                    ? parseFloat(fixedAmountInputValue)
                    : 0
                  : percentageInputValue
                  ? parseFloat(percentageInputValue)
                  : 0
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
