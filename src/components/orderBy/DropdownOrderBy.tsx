import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  CheckIcon,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  label: string
  value: 'asc' | 'desc' | undefined
  setValue(value: 'desc' | 'asc' | undefined): void
}

export default function DropdownOrderBy({ label, value, setValue }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex items-center gap-2 h-8'>
          {label}
          {value === 'asc' ? (
            <ArrowUpNarrowWide className='h-4 w-4 text-primary' />
          ) : value === 'desc' ? (
            <ArrowDownWideNarrow className='h-4 w-4 text-primary' />
          ) : (
            <ChevronDown className='h-4 w-4 text-muted-foreground' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64'>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            if (value === 'asc') {
              setValue(undefined)
            } else {
              setValue('asc')
            }
          }}
        >
          <ArrowUpNarrowWide className='h-4 w-4 mr-2' />
          Возрастающий (А-Я, 1-10)
          <CheckIcon
            className={cn(
              'ml-auto h-4 w-4',
              value === 'asc' ? 'opacity-100' : 'opacity-0'
            )}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            if (value === 'desc') {
              setValue(undefined)
            } else {
              setValue('desc')
            }
          }}
        >
          <ArrowDownWideNarrow className='h-4 w-4 mr-2' />
          Убывающий (Я-А, 10-1)
          <CheckIcon
            className={cn(
              'ml-auto h-4 w-4',
              value === 'desc' ? 'opacity-100' : 'opacity-0'
            )}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
