import { X } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
  resetFilters(): void
}

export default function ResetFiltersButton({
  resetFilters,
}: Props) {
  return (
    <Button
      className='flex items-center gap-2'
      variant='secondary'
      onClick={() => resetFilters()}
    >
      <X className='h-4 w-4' />
      Сбросить фильтры
    </Button>
  )
}
