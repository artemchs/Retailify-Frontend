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
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CurrencyFormatter } from '@/components/ui/units'
import getDiscountedPrice from '@/utils/getDiscountedPrice'
import { Coins, Percent, Receipt, Save } from 'lucide-react'
import { useState } from 'react'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { CashRegisterItem } from '../../types/cash-register-order-form-schema'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export default function AddCustomBulkDiscountDialog({ form }: Props) {
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

  function setCustomBulkDiscountType(value: 'FIXED-AMOUNT' | 'PERCENTAGE') {
    form.setValue('customBulkDiscountType', value)
  }

  function setCustomBulkDiscountFixedAmount(value?: string) {
    form.setValue(
      'customBulkDiscountFixedAmount',
      value ? parseFloat(value) : 0
    )
  }

  function setCustomBulkDiscountPercentage(value?: string) {
    form.setValue('customBulkDiscountPercentage', value ? parseFloat(value) : 0)
  }

  const handleSubmit = () => {
    setIsOpened(false)
    setCustomBulkDiscountType(tabsValue)
    if (tabsValue === 'FIXED-AMOUNT') {
      setCustomBulkDiscountFixedAmount(fixedAmountInputValue)
      setPercentageInputValue('')
      setCustomBulkDiscountPercentage()
    } else {
      setCustomBulkDiscountPercentage(percentageInputValue)
      setFixedAmountInputValue('')
      setCustomBulkDiscountFixedAmount()
    }
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button variant='secondary'>
          <Receipt className='h-4 w-4 mr-2' />
          Скидка на чек
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить скидку на чек</DialogTitle>
          <DialogDescription>
            Это действие добавляет скидку на весь чек.
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
