import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Coins, CreditCard } from 'lucide-react'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'paymentMethod'>
}

export default function PaymentMethodRadioGroup({ field }: Props) {
  return (
    <RadioGroup
      onValueChange={field.onChange}
      defaultValue={field.value}
      className='flex items-center flex-row gap-2'
    >
      <FormItem className='flex w-full'>
        <FormControl>
          <RadioGroupItem value='CASH' className='peer sr-only' />
        </FormControl>
        <FormLabel className='flex cursor-pointer w-full flex-col gap-2 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
          <Coins className='h-5 w-5' />
          Наличными
        </FormLabel>
      </FormItem>
      <FormItem className='flex w-full'>
        <FormControl>
          <RadioGroupItem value='CARD' className='peer sr-only' />
        </FormControl>
        <FormLabel className='flex cursor-pointer w-full flex-col gap-2 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
          <CreditCard className='h-5 w-5' />
          Безналичными
        </FormLabel>
      </FormItem>
      <FormItem className='flex w-full'>
        <FormControl>
          <RadioGroupItem value='MIXED' className='peer sr-only' />
        </FormControl>
        <FormLabel className='flex cursor-pointer w-full flex-col gap-2 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
          {/* <Settings2 className='h-6 w-6' /> */}
          <div className='flex items-center gap-1'>
            <Coins className='h-5 w-5' />
            +
            <CreditCard className='h-5 w-5' />
          </div>
          Смешанная
        </FormLabel>
      </FormItem>
    </RadioGroup>
  )
}
