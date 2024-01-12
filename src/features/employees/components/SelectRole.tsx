import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ControllerRenderProps } from 'react-hook-form'
import { employeeRole } from '../placeholders'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'role'>
}

export default function SelectRole({ field }: Props) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={employeeRole} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value='CASHIER'>Кассир</SelectItem>
        <SelectItem value='ECOMMERCE_MANAGER'>Ecommerce менеджер</SelectItem>
      </SelectContent>
    </Select>
  )
}
