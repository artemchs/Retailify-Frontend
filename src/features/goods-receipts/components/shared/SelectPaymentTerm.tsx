import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ControllerRenderProps } from 'react-hook-form'
import { paymentTerms as paymentTermsPlaceholder } from './placeholders'
import { paymentTerms } from '@/types/entities/GoodsReceipt'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'paymentTerm'>
}

export default function SelectPaymentTerm({ field }: Props) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={paymentTermsPlaceholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {Object.entries(paymentTerms).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
