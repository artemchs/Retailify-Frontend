import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ControllerRenderProps } from 'react-hook-form'
import { productSeason } from './placeholders'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'season'>
}

export default function SelectSeason({ field }: Props) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={productSeason} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value='WINTER'>Зима</SelectItem>
        <SelectItem value='SPRING_FALL'>Весна-Осень</SelectItem>
        <SelectItem value='SUMMER'>Лето</SelectItem>
        <SelectItem value='ALL_SEASON'>Всесезон</SelectItem>
      </SelectContent>
    </Select>
  )
}
