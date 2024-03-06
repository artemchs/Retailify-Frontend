import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Filter } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
  children: React.ReactNode
  numOfApplied: number
  resetFilters(): void
}

export default function DropdownFilter({
  children,
  numOfApplied,
  resetFilters,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2 w-full'>
          <Filter className='h-4 w-4' />
          Фильтры
          {numOfApplied >= 1 && (
            <div className='h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center'>
              {numOfApplied}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40 lg:w-64'>
        <DropdownMenuLabel className='flex items-center justify-between'>
          <span>Фильтры</span>
          <button
            className='font-normal text-primary hover:underline'
            onClick={() => resetFilters()}
          >
            Сбросить
          </button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
