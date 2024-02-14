import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  fieldName: string
}

export function DatePickerWithPresets({ field, form, fieldName }: Props) {
  const date = field.value as Date

  function setDate(newDate?: Date) {
    form.setValue(fieldName, newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Выберите дату</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='flex w-auto flex-col space-y-2 p-2'
      >
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Выберите' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem value='0'>Сегодня</SelectItem>
            <SelectItem value='1'>Завтра</SelectItem>
            <SelectItem value='3'>Через 3 дня</SelectItem>
            <SelectItem value='7'>Через неделю</SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-md border'>
          <Calendar mode='single' selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
