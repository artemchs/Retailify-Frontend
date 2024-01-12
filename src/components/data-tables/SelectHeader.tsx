import { Table } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'

type Props<T> = {
  table: Table<T>
}

export default function SelectHeader<T>({ table }: Props<T>) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label='Выбрать все строки'
    />
  )
}
