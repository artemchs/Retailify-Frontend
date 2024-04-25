/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormDescription,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ControllerRenderProps, UseFormReturn, useWatch } from 'react-hook-form'
import { productVariantSale } from '../../placeholders'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { FaMoneyBill } from 'react-icons/fa6'
import { Percent } from 'lucide-react'
import getDiscountedPrice from '@/utils/getDiscountedPrice'
import AsyncInput from '@/components/forms/AsyncInput'

type Props = {
  field: ControllerRenderProps<any, 'sale'>
  form: UseFormReturn<any, any, undefined>
  isLoading?: boolean
  isError?: boolean
}

export default function ProductVariantSaleInput({
  field,
  form,
  isError,
  isLoading,
}: Props) {
  const [price, saleType] = useWatch({
    control: form.control,
    name: ['price', 'saleType'],
  })

  return (
    <FormItem>
      <Label>Скидка:</Label>
      <FormControl>
        <div className='flex gap-2 items-center'>
          <AsyncInput
            input={
              <Input
                type='number'
                disabled={!price}
                {...field}
                placeholder={productVariantSale}
              />
            }
            isError={isError ?? false}
            isLoading={isLoading ?? false}
          />
          <ToggleGroup
            type='single'
            variant='outline'
            value={saleType}
            onValueChange={(value: 'FIXED-AMOUNT' | 'PERCENTAGE') =>
              form.setValue('saleType', value)
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
      </FormControl>
      {field.value && (
        <FormDescription>
          Цена после скидки:{' '}
          {getDiscountedPrice(saleType, price, field.value).toFixed(2)} грн
        </FormDescription>
      )}
      <FormMessage />
    </FormItem>
  )
}
