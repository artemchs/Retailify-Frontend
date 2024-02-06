import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ControllerRenderProps } from 'react-hook-form'
import { productGender } from './placeholders'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'gender'>
}

export default function SelectGender({ field }: Props) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={productGender} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value='MALE'>Мужской</SelectItem>
        <SelectItem value='FEMALE'>Женский</SelectItem>
        <SelectItem value='UNISEX'>Унисекс</SelectItem>
      </SelectContent>
    </Select>
  )
}
