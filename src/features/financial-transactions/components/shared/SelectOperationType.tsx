import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Banknote, Factory } from 'lucide-react'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, 'type'>
}

export default function SelectOperationType({ field }: Props) {
    return (
        <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className='flex items-center flex-row gap-2'
        >
            <FormItem className='flex w-full'>
                <FormControl>
                    <RadioGroupItem
                        value='SUPPLIER_PAYMENT'
                        className='peer sr-only'
                    />
                </FormControl>
                <FormLabel className='flex cursor-pointer w-full flex-col gap-2 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
                    <Factory className='h-5 w-5' />
                    Оплата поставщику
                </FormLabel>
            </FormItem>
            <FormItem className='flex w-full'>
                <FormControl>
                    <RadioGroupItem value='OTHER' className='peer sr-only' />
                </FormControl>
                <FormLabel className='flex cursor-pointer w-full flex-col gap-2 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
                    <Banknote className='h-5 w-5' />
                    Другое
                </FormLabel>
            </FormItem>
        </RadioGroup>
    )
}
