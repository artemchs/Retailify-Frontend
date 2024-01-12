import { Row } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'

type Props<T> = {
  row: Row<T>
}

export default function SelectCell<T>({ row }: Props<T>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label='Выбрать строку'
    />
  )
}
