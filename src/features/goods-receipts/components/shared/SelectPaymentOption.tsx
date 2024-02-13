import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ControllerRenderProps } from 'react-hook-form'
import { paymentOptions as paymentOptionsPlaceholder } from './placeholders'
import { paymentOptions } from '@/types/entities/GoodsReceipt'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'paymentOption'>
}

export default function SelectPaymentOption({ field }: Props) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={paymentOptionsPlaceholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {Object.entries(paymentOptions).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
