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
}

export default function DropdownFilter({
  children,
  numOfApplied,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2'>
          <Filter className='h-4 w-4' />
          Фильтры
          {numOfApplied >= 1 && (
            <div className='h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center'>
              {numOfApplied}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Фильтры</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
